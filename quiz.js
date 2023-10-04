// Charger le fichier JSON
fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    // Mélanger les questions de manière aléatoire
    const shuffledQuestions = shuffleArray(data.questions);

    // Accéder aux éléments HTML pour afficher la question et les réponses
    const questionElement = document.querySelector(".question");
    const answerElements = document.querySelectorAll(".answer");

    // Variable pour suivre l'indice de la question actuelle
    let currentQuestionIndex = 0;

    // Fonction pour afficher la question et les réponses
    function displayQuestion() {
      if (currentQuestionIndex < shuffledQuestions.length) {
        const questionData = shuffledQuestions[currentQuestionIndex];

        // Afficher la question
        questionElement.textContent = questionData.question;

        // Mélanger les réponses de manière aléatoire
        const shuffledOptions = shuffleArray(questionData.options);

        // Afficher les réponses
        shuffledOptions.forEach((option, index) => {
          answerElements[index].textContent = option;
        });
      } else {
        // Toutes les questions ont été répondues
        questionElement.textContent = "Quiz terminé !";
        answerElements.forEach((answer) => {
          answer.textContent = "";
        });
      }
    }

    // Fonction pour mélanger un tableau de manière aléatoire
    function shuffleArray(array) {
      const shuffled = array.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    // Appeler la fonction pour afficher la première question
    displayQuestion();

    // Gestionnaire d'événements pour les boutons de réponse
    answerElements.forEach((answer) => {
      answer.addEventListener("click", () => {
        const selectedAnswer = answer.textContent;
        const questionData = shuffledQuestions[currentQuestionIndex];
        const correctAnswer = questionData.correctAnswer;

        // Désactiver les boutons de réponse pour éviter les réponses multiples
        answerElements.forEach((button) => {
          button.disabled = true;
        });

        // Vérifier si la réponse est correcte
        if (selectedAnswer === correctAnswer) {
          // Réponse correcte : ajoutez un emoji vert
          const img1 = document.querySelector(".img1");
            img1.style.top = 150 + "px";
          answer.classList.add("btn-success");
        } else {
          // Réponse incorrecte : ajoutez un emoji rouge
          const img2 = document.querySelector(".img2");
            img2.style.top = 150 + "px";
          answer.classList.add("btn-danger");
        }

        // Passer à la question suivante après 2 secondes
        setTimeout(() => {
            currentQuestionIndex++;
            answer.classList.remove("btn-success", "btn-danger");
          resetAnswerStyles();
          displayQuestion();
        }, 5000); // Attendez 5 secondes avant de passer à la question suivante
      });
    });

    // Fonction pour réinitialiser les styles des réponses
    function resetAnswerStyles() {
        answerElements.forEach((button) => {
            const img1 = document.querySelector(".img1");
            img1.style.top = -500 + "px";
            
            const img2 = document.querySelector(".img2");
            img2.style.top = -500 + "px";
        
            button.disabled = false; // Réactivez les boutons de réponse
      });
    }
  })
  .catch((error) =>
    console.error(
      "Une erreur s'est produite lors du chargement du fichier JSON.",
      error
    )
  );
