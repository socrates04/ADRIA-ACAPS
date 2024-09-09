export default {
    "id": "66d04289df27dd19c8b53ad2",
    "title": "Customer Satisfaction Survey",
    "creationDate": "2024-08-27T12:34:56.000+00:00",
    "validated": true,
    "validationDate": null,
    "distributed": true,
    "validationScore": 85,
    "nbrSubmissions": 0,
    "lastUpdated": "2024-08-27T12:34:56.000+00:00",
    "validatorId": "validator123",
    "validatorName": "John Doe",
    "creatorId": "creator456",
    "creatorName": "Jane Smith",
    "sections": [
        {
            "title": "Personal Information",
            "validationScore": 70,
            "questions": [
                {
                    "number": 1,
                    "text": "What is your age?",
                    "type": "UNIQUECHOICE",
                    "required": true,
                    "choices": [
                        {
                            "name": "18-24",
                            "grade": 1,
                            "subsection":[]
                        },
                        {
                            "name": "25-34",
                            "grade": 2,
                            "subsection":[]
                        }
                    ]
                },
                {
                    "number": 2,
                    "text": "Are you satisfied with our service?",
                    "type": "BOULEAN",
                    "required": true,
                    "choices": [
                        {
                            "name": "Yes",
                            "grade": 1,
                            "subsection": []
                        },
                        {
                            "name": "No",
                            "grade": 0,
                            "subsection":[
                                {
                                    "number": 3,
                                    "text": "Please explain why you are not satisfied.",
                                    "type": "MULTICHOICE",
                                    "required": true,
                                    "choices": [
                                        {
                                            "name": "Price",
                                            "grade": 1,
                                        },
                                        {
                                            "name": "Quality",
                                            "grade": 2,
                                        }
                                    ],
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "title": "postman",
            "validationScore": 201,
            "questions": [
                {
                    "number": 1,
                    "text": "how are you doing today ?",
                    "type": "UNIQUECHOICE",
                    "required": true,
                    "choices": [
                        {
                            "name": "bad",
                            "grade": "0",
                            "subsection":[
                                {
                                    "number": 1,
                                    "text": "do you think i care ?",
                                    "type": "UNIQUECHOICE",
                                    "required": true,
                                    "choices": [
                                        {"name": "no","grade":10},
                                        {"name": "yes","grade":0},
                                    ],
                                }
                            ]
                        },
                        {
                            "name": "good",
                            "grade": 10,
                            "subsection" :[
                                {
                                    "number": 1,
                                    "text": "could it have been batter?",
                                    "type": "UNIQUECHOICE",
                                    "required": true,
                                    "choices": [
                                        {"name":"yes", "grade":10},
                                        {"name":"no", "grade":0},
                                    ],
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};