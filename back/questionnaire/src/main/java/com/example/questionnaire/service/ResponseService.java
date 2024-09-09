package com.example.questionnaire.service;

import com.example.questionnaire.exceptions.InvalidResponse;
import com.example.questionnaire.exceptions.QuestionnaireNotFound;
import com.example.questionnaire.model.*;
import com.example.questionnaire.repo.QuestionnaireRepo;
import com.example.questionnaire.repo.ResponseRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ResponseService {
    private final ResponseRepo responseRepo;
    private final QuestionnaireRepo questionnaireRepo;

    public ResponseService(ResponseRepo responseRepo, QuestionnaireRepo questionnaireRepo) {
        this.responseRepo = responseRepo;
        this.questionnaireRepo = questionnaireRepo;
    }

    public List<Response> getAll() {
        return responseRepo.findAll();
    }

    public List<Response> getResponseForQuestionnaire(String questionnaireId) {
        return responseRepo.findResponseByQuestionnaireId(questionnaireId);
    }

    public Response submit(Response response) throws QuestionnaireNotFound, InvalidResponse {
        Optional<Questionnaire> qo = questionnaireRepo.findById(response.getQuestionnaireId());
        if (qo.isEmpty()) throw new QuestionnaireNotFound("No questionnaire matches response");

        int sectionScore, responseScore = 0, itemScore;

        Questionnaire questionnaire = qo.get();
        for (SectionResponse sectionResponse : response.getSections()) {
            Optional<Section> qso = questionnaire.getSection(sectionResponse.getTitle());
            if (qso.isEmpty()) throw new InvalidResponse("Section " + sectionResponse.getTitle() + " not found in the questionnaire.");

            Section qSection = qso.get();
            sectionScore = 0;

            for (ResponseItem answer : sectionResponse.getAnswers()) {
                itemScore = 0;
                Optional<Question> question = qSection.getQuestions().stream()
                        .filter(q -> q.getNumber()==answer.getQuestionNumber())
                        .findFirst();

                if (question.isEmpty()) throw new InvalidResponse(
                        "Question number " + answer.getQuestionNumber() + " not found in section " + qSection.getTitle());

                for (String userAnswer : answer.getAnswers()) {
                    Optional<Option> matchedOption = question.get().getChoices().stream()
                            .filter(option -> option.getName().equals(userAnswer))
                            .findFirst();

                    if (matchedOption.isPresent()) {
                        itemScore += matchedOption.get().getGrade();
                    }
                }
                answer.setScore(itemScore); // Set score at response item level if needed
                sectionScore += itemScore;
            }

            sectionResponse.setScore(sectionScore);
            responseScore += sectionScore;
            sectionResponse.setValidated(qSection.getValidationScore() <= sectionScore);
        }

        response.setValidated(responseScore >= questionnaire.getValidationScore());
        response.setTotalScore(responseScore);
        response = responseRepo.save(response);

        // Increment number of submissions for the questionnaire
        questionnaire.setNbrSubmissions(questionnaire.getNbrSubmissions() + 1);
        questionnaireRepo.save(questionnaire);

        return response;
    }
}
