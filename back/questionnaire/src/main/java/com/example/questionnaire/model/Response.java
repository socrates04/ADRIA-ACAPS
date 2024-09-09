package com.example.questionnaire.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Document("response")
@Data
@AllArgsConstructor @NoArgsConstructor
public class Response {
    private String id;
    private String questionnaireId;
    private int version;
    private String respondentId;

    private List<SectionResponse> sections;

    private boolean submitted=false;
    private Date submittedDate= new Date();

    private Date lastUpdate= new Date();

    private int totalScore;
    private boolean validated;

    public Response(String questionnaireId, String respondentId, List<SectionResponse> sections) {
        this.questionnaireId = questionnaireId;
        this.respondentId = respondentId;
        this.sections = sections;
    }
}
