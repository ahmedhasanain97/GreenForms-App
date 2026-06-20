//adding questions
let questionCount = 1;

const addQuestionBtn = document.getElementById("add-question");
const questionsContainer = document.getElementById("questions-container");

addQuestionBtn.addEventListener("click", () => {


questionCount++;

const questionCard = document.createElement("div");

questionCard.className = "card mb-3 question-card";

questionCard.innerHTML = `
    <div class="card-body">

        <h5 class="mb-3">
            Question #${questionCount}
        </h5>

        <div class="mb-3">
            <label class="flbl">
                Question Text
            </label>

            <input
                type="text"
                class="fctrl"
                name="questions[${questionCount - 1}][questionText]"
                placeholder="Enter question"
                value="<%= oldData?.questions[0].questionText || '' %>"
                required
            >
        </div>

        <div class="mb-3">
            <label class="flbl">
                Question Type
            </label>

            <select
                class="fctrl"
                name="questions[${questionCount - 1}][questionType]"
            >
                <option value="text">Text</option>
                <option value="multiple-choice">Multiple Choice</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
            </select>
        </div>

        <div class="form-check mb-3">
            <input
                type="checkbox"
                class="form-check-input"
                name="questions[${questionCount - 1}][isRequired]"
            >

            <label class="form-check-label">
                Required
            </label>
        </div>

        <button
            type="button"
            class="btn btn-outline-danger btn-sm remove-question">
            Remove
        </button>

    </div>
`;

questionsContainer.appendChild(questionCard);


});
// remove question 
questionsContainer.addEventListener("click",(e)=>{

    if(e.target.classList.contains("remove-question")){

        e.target.closest(".question-card").remove();

    }

});
//if question type is multiple choice we add options
questionsContainer.addEventListener("change",(e)=>{

    if(!e.target.classList.contains("question-type")) return;

    const questionCard = e.target.closest(".question-card");

    const optionsContainer =
        questionCard.querySelector(".options-container");

    if(e.target.value === "multiple-choice"){

        optionsContainer.innerHTML = `
            <div class="mt-3">

                <label class="flbl">
                    Options
                </label>

                <input
                    type="text"
                    class="fctrl mb-2"
                    placeholder="Option 1"
                >

                <input
                    type="text"
                    class="fctrl mb-2"
                    placeholder="Option 2"
                >

                <button
                    type="button"
                    class="btn btn-outline-success btn-sm add-option">
                    + Add Option
                </button>

            </div>
        `;

    }else{

        optionsContainer.innerHTML = "";

    }

});