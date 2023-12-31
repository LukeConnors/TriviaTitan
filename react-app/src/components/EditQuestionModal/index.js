import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom'
import * as questionActions from "../../store/questions"
import "./EditQuestion.css"

function EditQuestion({ question, questionId }) {
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    const history = useHistory()
    const incorrectAnswersArray = question.incorrect_answers.split(', ');
    const [formData, setFormData] = useState({
        category: question.category,
        type: question.type,
        difficulty: question.difficulty,
        question: question.question,
        correct_answer: question.correct_answer,
        incorrect_answer1: incorrectAnswersArray[0] || "",
        incorrect_answer2: incorrectAnswersArray[1] || "",
        incorrect_answer3: incorrectAnswersArray[2] || ""
    });
    const categoryChoices = ["General Knowledge", "Entertainment: Books", "Entertainment: Film",
        "Entertainment: Music", "Entertainment: Musicals & Theatres", "Entertainment: Television",
        "Entertainment: Video Games", "Entertainment: Board Games", "Science & Nature",
        "Science: Computers", "Science: Mathematics", "Mythology", "Sports",
        "Geography", "History", "Politics", "Art", "Celebrities", "Animals"]

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { incorrect_answer1, incorrect_answer2, incorrect_answer3 } = formData;
        let formErrors = {};
        if (!formData.question) {
            formErrors.question = "Question is required"
        }
        if (!formData.correct_answer) {
            formErrors.correct_answer = "Correct answer is required";
        }
        if (!formData.difficulty) {
            formErrors.difficulty = "Please select a question difficulty"
        }
        if (!formData.type) {
            formErrors.type = "Please select a question type"
        }
        if (!formData.category) {
            formErrors.category = "Please select a question category"
        }
        if (formData.type === "boolean" && !formData.incorrect_answer1) {
            formErrors.incorrect_answer1 = "True/False types require an incorrect answer of True or False"
        }
        if (formData.type === "boolean" && formData.incorrect_answer1 !== "True" && formData.incorrect_answer1 !== "False") {
            formErrors.incorrect_answer1 = "True/False types require an incorrect answer of True or False"
        }
        if (formData.type === "boolean" && formData.correct_answer !== "True" && formData.correct_answer !== "False") {
            formErrors.correct_answer = "True/False types require a correct answer of True or False"
        }
        if (formData.type === "boolean" && formData.correct_answer === "True" && formData.incorrect_answer1 === "True") {
            formErrors.incorrect_answer1 = "Your incorrect answer cannot be the same as the correct answer!"
        }
        if (formData.type === "boolean" && formData.correct_answer === "False" && formData.incorrect_answer1 === "False") {
            formErrors.incorrect_answer1 = "Your incorrect answer cannot be the same as the correct answer!"
        }
        if (formData.type === "boolean" && formData.incorrect_answer2) {
            formErrors.incorrect_answer2 = "True/False questions should only have one incorrect answer, fill this out in Incorrect Answer 1!"
        }
        if (formData.type === "boolean" && formData.incorrect_answer3) {
            formErrors.incorrect_answer3 = "True/False questions should only have one incorrect answer, fill this out in Incorrect Answer 1!"
        }
        if (formData.type === "multiple" && !formData.incorrect_answer1) {
            formErrors.incorrect_answer1 = "Multiple choice types require 3 incorrect answers"
        }
        if (formData.type === "multiple" && !formData.incorrect_answer2) {
            formErrors.incorrect_answer2 = "Multiple choice types require 3 incorrect answers"
        }
        if (formData.type === "multiple" && !formData.incorrect_answer3) {
            formErrors.incorrect_answer3 = "Multiple choice types require 3 incorrect answers"
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        const incorrect_answers = [incorrect_answer1, incorrect_answer2, incorrect_answer3].join(', ');

        const finalFormData = {
            ...formData,
            incorrect_answers
        };

        await dispatch(questionActions.editQuestion(questionId, finalFormData));
        await dispatch(questionActions.fetchMyQuestions())
        closeModal()
    };
    return (
        <div className="edit-question-container">
            <h1>Edit Your Question:</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="errors">{errors?.question}</div>
                    <h3>Question</h3>
                    <textarea
                        className="form-input"
                        id="question"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div className="errors">{errors?.correct_answer}</div>
                    <h3>Correct Answer</h3>
                    <input
                        type="text"
                        id="correct_answer"
                        className="form-input"
                        name="correct_answer"
                        value={formData.correct_answer}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div className="errors">{errors?.incorrect_answer1}</div>
                    <h3>Incorrect Answer #1</h3>
                    <input
                        type="text"
                        id="incorrect_answer1"
                        className="form-input"
                        name="incorrect_answer1"
                        value={formData.incorrect_answer1}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div className="errors">{errors?.incorrect_answer2}</div>
                    <h3>Incorrect Answer #2</h3>
                    <input
                        type="text"
                        id="incorrect_answer2"
                        className="form-input"
                        name="incorrect_answer2"
                        value={formData.incorrect_answer2}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div className="errors">{errors?.incorrect_answer3}</div>
                    <h3>Incorrect Answer #3</h3>
                    <input
                        type="text"
                        id="incorrect_answer3"
                        className="form-input"
                        name="incorrect_answer3"
                        value={formData.incorrect_answer3}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div className="errors">{errors?.category}</div>
                    <h3>Category</h3>
                    <select
                        id="category"
                        className="form-input"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option>Select Category</option>
                        {categoryChoices.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <div className="errors">{errors?.type}</div>
                    <h3>Type</h3>
                    <select
                        value={formData.type}
                        className="form-input"
                        name="type"
                        onChange={handleChange}
                    >
                        <option>Select a type...</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True/False</option>
                    </select>
                </div>
                <div>
                    <div className="errors">{errors?.difficulty}</div>
                    <h3>Difficulty</h3>
                    <select
                        value={formData.difficulty}
                        name="difficulty"
                        className="form-input"
                        onChange={handleChange}
                    >
                        <option value="">Select a difficulty...</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="login-button-div">
                    <button className="login-button" type="submit">Submit</button>
                    <button className="login-button" onClick={() => closeModal()}>Close</button>
                </div>
            </form>
        </div>
    );

}

export default EditQuestion
