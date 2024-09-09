package com.example.questionnaire.service;

import com.example.questionnaire.QuestionnaireProjection;
import com.example.questionnaire.repo.QuestionnaireRepo;
import com.example.questionnaire.exceptions.*;
import com.example.questionnaire.model.Questionnaire;
import com.example.questionnaire.model.Section;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionnaireService {
    private final QuestionnaireRepo questionnaireRepo;

    public QuestionnaireService(QuestionnaireRepo questionnaireRepo) {
        this.questionnaireRepo = questionnaireRepo;
    }

    public List<QuestionnaireProjection> getAllForTable(){
        return questionnaireRepo.findQuestionnaireBy();
    }

    public Questionnaire save(Questionnaire q){
        String id = q.getId();
        // checking the preexistence of the questionnaire
        if (id!=null && questionnaireRepo.findById(id).isPresent())
            q.setVersion(q.getVersion()+1); // incrementing the version of the questionnaire.

        return questionnaireRepo.save(q);
    }

    public Questionnaire setValidation(String id,boolean state) throws QuestionnaireValidationException {
        Optional<Questionnaire> op = questionnaireRepo.findById(id);
        if(op.isEmpty() ) return null;// questionnaire not found
        Questionnaire q = op.get();
        if (state && !q.testForValidation()) throw new QuestionnaireValidationException("Questionnaire does not meet validation standards.");
        q.setValidated(state);
        return questionnaireRepo.save(q);
    }

    public Questionnaire setPublication(String id,boolean state) throws UnvalidatedQuestionnaireException {
        Optional<Questionnaire> op = questionnaireRepo.findById(id);
        if (op.isEmpty()) return null;// questionnaire not found
        Questionnaire q = op.get();
        if(!q.isValidated()) throw new UnvalidatedQuestionnaireException("Cannot publish an unvalidated questionnaire.");
        q.setDistributed(state);
        return questionnaireRepo.save(q);
    }

    // update a section of a questionnaire with the same title. if not found, inserts it
    public Questionnaire updateSections(String questionnaireId, Section section) throws QuestionnaireNotFound {
        Optional<Questionnaire> qo = questionnaireRepo.findById(questionnaireId);
        if (qo.isEmpty()) throw new QuestionnaireNotFound("No Questionnaire found with the id:"+questionnaireId);
        Questionnaire questionnaire = qo.get();

        Optional<Section> so = questionnaire.getSection(section.getTitle());
        if (so.isEmpty()){ // adding a new section
            questionnaire.addSection(section);
        }else{// updating a preexisting section
            Section oldSection = so.get();
            oldSection.setValidationScore(section.getValidationScore());
            oldSection.setQuestions(new ArrayList<>(section.getQuestions()));
        }
        return questionnaireRepo.save(questionnaire);
    }

    //removing a section with a given title from a questionnaire with a given id
    public Questionnaire removeSection(String id, String sectionTitle) throws QuestionnaireNotFound{
        Optional<Questionnaire> qo = questionnaireRepo.findById(id);
        if (qo.isEmpty()) throw new QuestionnaireNotFound("No Questionnaire found with the id:"+id);
        Questionnaire q = qo.get();

        q.removeSection(sectionTitle);
        return questionnaireRepo.save(q);
    }
}

