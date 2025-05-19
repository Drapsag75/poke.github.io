document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Quel est le premier Pokémon du Pokédex ?",
            options: ["Pikachu", "Bulbizarre", "Salamèche", "Carapuce"],
            correct: 2 // La réponse attendue est 2
        },
        {
            question: "Quelle est la faiblesse des Pokémon de type Feu ?",
            options: ["Eau", "Plante", "Électrik", "Combat"],
            correct: 1 // La réponse attendue est 1
        },
        {
            question: "Quel est le niveau maximum d'un Pokémon ?",
            options: ["50", "999", "150", "100"],
            correct: 4 // La réponse attendue est 4
        }
    ];

    let currentQuestion = 0;
    const answers = [];
    let isBruteForcing = false;
    let currentCombination = [1, 1, 1];

    function showQuestion() {
        const quizContainer = document.getElementById('quiz-container');
        const question = questions[currentQuestion];

        const html = `
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                <h3 class="text-xl font-bold mb-4">${question.question}</h3>
                <div class="space-y-2">
                    ${question.options.map((option, index) => `
                        <button class="answer-btn w-full text-left p-3 rounded bg-gray-100 hover:bg-blue-100 transition-colors" 
                                data-index="${index}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        quizContainer.innerHTML = html;

        // Ajouter les événements aux boutons
        document.querySelectorAll('.answer-btn').forEach(button => {
            button.addEventListener('click', handleAnswer);
        });

        // Ajouter les boutons de réinitialisation et de brute force
        const contactSection = document.getElementById('contact');
        if (!document.getElementById('reset-button')) {
            const resetButton = document.createElement('button');
            resetButton.id = 'reset-button';
            resetButton.className = 'absolute bottom-4 right-4 bg-blue-500 hover:bg-red-300 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1';
            resetButton.textContent = 'Recommencer';
            resetButton.onclick = resetQuiz;
            contactSection.style.position = 'relative';
            contactSection.appendChild(resetButton);

            const bruteForceButton = document.createElement('button');
            bruteForceButton.id = 'brute-force-button';
            bruteForceButton.className = 'absolute bottom-4 left-4 bg-green-500 hover:bg-yellow-300 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1';
            bruteForceButton.textContent = 'Brute Force';
            bruteForceButton.onclick = startBruteForce;
            contactSection.appendChild(bruteForceButton);
        }
    }

    async function startBruteForce() {
        if (isBruteForcing) return;
        isBruteForcing = true;
        
        const bruteForceButton = document.getElementById('brute-force-button');
        bruteForceButton.disabled = true;
        bruteForceButton.textContent = 'Brute Force en cours...';

        // Créer l'indicateur de progression
        const progressContainer = document.createElement('div');
        progressContainer.id = 'brute-force-progress';
        progressContainer.className = 'fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50';
        progressContainer.innerHTML = `
            <div class="text-center p-8 bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4">
                <h3 class="text-2xl font-bold mb-6">Brute Force en cours</h3>
                <div class="flex items-center justify-center mb-6">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
                </div>
                <p class="text-xl text-gray-700 mb-4">Test de la combinaison:</p>
                <p class="text-3xl font-mono bg-gray-100 p-4 rounded-lg" id="current-combination">A1_1_A2_1_A3_1</p>
                <div class="w-full h-4 bg-gray-200 rounded-full mt-6">
                    <div id="progress-bar" class="h-4 bg-blue-500 rounded-full transition-all duration-300" style="width: 0%"></div>
                </div>
            </div>
        `;
        document.body.appendChild(progressContainer);

        // Réinitialiser le quiz
        currentQuestion = 0;
        answers.length = 0;
        currentCombination = [1, 1, 1];

        // Calculer le nombre total de combinaisons
        const totalCombinations = 4 * 4 * 4; // 4 options pour chaque question
        let currentCombinationIndex = 0;

        while (isBruteForcing) {
            // Mettre à jour l'indicateur de progression
            currentCombinationIndex++;
            const progress = (currentCombinationIndex / totalCombinations) * 100;
            document.getElementById('current-combination').textContent = 
                `A1_${currentCombination[0]}_A2_${currentCombination[1]}_A3_${currentCombination[2]}`;
            document.getElementById('progress-bar').style.width = `${progress}%`;

            // Construire le nom du fichier pour la combinaison actuelle
            const fileName = `A1_${currentCombination[0]}_A2_${currentCombination[1]}_A3_${currentCombination[2]}.html`;
            const currentPath = window.location.pathname;
            const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
            const fullPath = basePath + fileName;

            try {
                const response = await fetch(fullPath);
                if (response.ok) {
                    // Si le fichier existe, rediriger vers lui
                    window.location.href = fullPath;
                    return;
                }
            } catch (error) {
                console.error('Erreur lors de la vérification:', error);
            }

            // Passer à la combinaison suivante
            currentCombination[2]++;
            if (currentCombination[2] > 4) {
                currentCombination[2] = 1;
                currentCombination[1]++;
                if (currentCombination[1] > 4) {
                    currentCombination[1] = 1;
                    currentCombination[0]++;
                    if (currentCombination[0] > 4) {
                        // Toutes les combinaisons ont été testées
                        isBruteForcing = false;
                        bruteForceButton.disabled = false;
                        bruteForceButton.textContent = 'Brute Force';
                        // Supprimer l'indicateur de progression
                        document.body.removeChild(progressContainer);
                        showError('Aucune combinaison valide trouvée');
                        return;
                    }
                }
            }

            // Attendre un peu pour ne pas surcharger le serveur
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    function handleAnswer(e) {
        const selectedAnswer = parseInt(e.target.dataset.index) + 1;
        answers.push(selectedAnswer);
        console.log('Réponse sélectionnée:', selectedAnswer);
        console.log('Réponses actuelles:', answers);

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            const fileName = `A1_${answers[0]}_A2_${answers[1]}_A3_${answers[2]}.html`;
            console.log('Tentative de redirection vers:', fileName);

            const currentPath = window.location.pathname;
            const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
            const fullPath = basePath + fileName;
            console.log('Chemin complet:', fullPath);

            fetch(fullPath)
                .then(response => {
                    if (response.ok) {
                        window.location.href = fullPath;
                    } else {
                        showError(fileName);
                    }
                })
                .catch(() => {
                    showError(fileName);
                });

            const resetButton = document.getElementById('reset-button');
            if (resetButton) {
                resetButton.remove();
            }
            const bruteForceButton = document.getElementById('brute-force-button');
            if (bruteForceButton) {
                bruteForceButton.remove();
            }
        }
    }

    function showError(fileName) {
        const quizContainer = document.getElementById('quiz-container');
        // Supprimer l'indicateur de progression s'il existe
        const progressContainer = document.getElementById('brute-force-progress');
        if (progressContainer) {
            document.body.removeChild(progressContainer);
        }
        
        quizContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
                <h3 class="text-xl font-bold mb-4">Dommage !</h3>
                <p class="mb-4">Cette combinaison de réponses n'existe pas. Réessaie !</p>
                <p class="text-sm text-gray-500">Combinaison essayée: ${fileName}</p>
                <button onclick="resetQuiz()" class="bg-blue-500 hover:bg-red-300 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1">
                    Recommencer
                </button>
            </div>
        `;
    }

    window.resetQuiz = function() {
        currentQuestion = 0;
        answers.length = 0;
        showQuestion();
    }

    const startButton = document.querySelector('#contact button');
    console.log('Bouton trouvé:', startButton);
    
    if (startButton) {
        startButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Clic sur le bouton');
            const contactSection = document.getElementById('contact');
            contactSection.innerHTML = `
                <div id="quiz-container" class="p-6"></div>
            `;
            showQuestion();
        });
    } else {
        console.error('Bouton non trouvé');
    }
}); 