package com.example.questionnaire.repo;

import com.example.questionnaire.QuestionnaireProjection;
import com.example.questionnaire.model.Questionnaire;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionnaireRepo extends MongoRepository<Questionnaire,String> {
    List<QuestionnaireProjection> findQuestionnaireBy();
    List<Questionnaire> findByQuestionnaireId();
}
