package com.example.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Random;

@RestController
public class EvaluationController {

    @PostMapping("/evaluate")
    public Map<String, Object> evaluate(@RequestBody Map<String, String> payload) {
        String question = payload.get("question");
        String answer = payload.get("answer");

        // Simulate AI evaluation logic here
        String evaluation = "AI Evaluation: This is a sample evaluation for the answer.";
        int rating = new Random().nextInt(10) + 1; // Random rating between 1 and 10

        return Map.of(
                "evaluation", evaluation,
                "rating", rating
        );
    }
}
