const surveyData = {
    "survey_id": "survey1",
    "thank_you_text": "Thank you for answering!",
    "pages": [
      {
        "id": "page1",
        "questions": [
          {
            "name": "nps",
            "type": "nps",
            "label": "How likely are you to recommend our service to a friend or colleague?",
            "range_min": 0,
            "range_max": 10,
            "required": true
          }
        ]
      },
      {
        "id": "page2",
        "questions": [
          {
            "name": "question1",
            "type": "textarea",
            "label": "Why did you give 6 or lower?",
            "required": true
          }
        ],
        "conditions": [
          {
            "value": 7,
            "question": "nps",
            "test": "lessthan"
          }
        ]
      },
      {
        "id": "page3",
        "questions": [
          {
            "name": "question2",
            "type": "textarea",
            "label": "Why did you give 7 or higher?",
            "required": true
          }
        ],
        "conditions": [
          {
            "value": 6,
            "question": "nps",
            "test": "greaterthan"
          }
        ]
      }
    ]
  }

  export default surveyData;