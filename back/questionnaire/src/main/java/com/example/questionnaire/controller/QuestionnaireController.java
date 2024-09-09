package com.example.questionnaire.controller;

import com.example.questionnaire.exceptions.QuestionnaireNotFound;
import com.example.questionnaire.exceptions.QuestionnaireValidationException;
import com.example.questionnaire.exceptions.UnvalidatedQuestionnaireException;
import com.example.questionnaire.model.Questionnaire;
import com.example.questionnaire.model.Section;
import com.example.questionnaire.repo.QuestionnaireRepo;
import com.example.questionnaire.service.QuestionnaireService;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/questionnaires")
public class QuestionnaireController {
    private final QuestionnaireRepo questionnaireRepo;
    private final QuestionnaireService questionnaireService;

    public QuestionnaireController(QuestionnaireRepo questionnaireRepo, QuestionnaireService questionnaireService) {
        this.questionnaireRepo = questionnaireRepo;
        this.questionnaireService = questionnaireService;
    }

    @GetMapping
    private ResponseEntity<?> getAll(){
        return ResponseEntity.ok(questionnaireService.getAllForTable());
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getQuestionnaire(@PathVariable String id){
        Optional<Questionnaire> q = questionnaireRepo.findById(id);
        return  q.isEmpty()?
                ResponseEntity.status(HttpStatus.NOT_FOUND).build()
                : ResponseEntity.ok(q.get());
    }

    @PostMapping("/{id}/validation={state}")
    private ResponseEntity<?> questionnaireValidation(@PathVariable String id, @PathVariable boolean state){
        try{
            Questionnaire newQ = questionnaireService.setValidation(id,state);
            if (newQ==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            return ResponseEntity.ok(newQ);
        }catch (QuestionnaireValidationException e){
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Validation failed.");
                errorResponse.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
    }

    @PutMapping("/{id}/publication={state}")
    public ResponseEntity<?> questionnairePublication(@PathVariable String id, @PathVariable boolean state) {
        try{
            Questionnaire newQ = questionnaireService.setPublication(id,state);
            if (newQ==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            return ResponseEntity.ok(newQ);
        }catch (UnvalidatedQuestionnaireException e){
            // Sending a detailed error response with a message
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Questionnaire is not validated.");
            errorResponse.put("message", "You cannot publish an unvalidated questionnaire.");

            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
    }

    // adding or modifying a section with a given title in a questionnaire with a given id
    @PutMapping("/{questionnaireId}/sections")
    private ResponseEntity<?> modifySection(@PathVariable String questionnaireId, @RequestBody Section section){
        try{
            Questionnaire questionnaire= questionnaireService.updateSections(questionnaireId,section);
            return ResponseEntity.ok(questionnaire);
        }catch (QuestionnaireNotFound e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // removing a section from a questionnaire
    @PutMapping("/{questionnaireId}/sections/{sectionTitle}")
    private ResponseEntity<?> removeSection(@PathVariable String questionnaireId,@PathVariable String sectionTitle){
        try{
            return ResponseEntity.ok(questionnaireService.removeSection(questionnaireId,sectionTitle));
        }catch (QuestionnaireNotFound e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    private ResponseEntity<?> insert(@RequestBody Questionnaire questionnaire){
        Questionnaire q = questionnaireRepo.insert(questionnaire);
        return ResponseEntity.status(HttpStatus.CREATED).body(q);
    }

    @DeleteMapping
    private ResponseEntity<?> delete(@Param("_id") String id){
        return ResponseEntity.ok(questionnaireRepo.findById(id));
    }
}



