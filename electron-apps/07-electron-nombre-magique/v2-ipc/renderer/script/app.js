// V2 — renderer/app.js
// Rôle : gérer l'interface uniquement.
// Ce fichier ne contient AUCUNE logique de jeu.
// Il envoie des données au main via window.guessService et affiche ce qu'il reçoit.

// -------------------------------------------------------
// Récupération des éléments du DOM (cours Kamal — section 2.2)
// -------------------------------------------------------
const input          = document.getElementById('input-nombre')
const btnValider     = document.getElementById('btn-valider')
const feedback       = document.getElementById('feedback')
const compteur       = document.getElementById('compteur')
const historique     = document.getElementById('historique')
const btnNouvelle    = document.getElementById('btn-nouvelle-partie')
const sectionScore   = document.getElementById('section-score')
const inputNom       = document.getElementById('input-nom')
const btnSaveScore   = document.getElementById('btn-save-score')
const listeScores    = document.getElementById('liste-scores')

// Mémorise le nombre d'essais final pour la sauvegarde du score
let essaisFinaux = 0

// -------------------------------------------------------
// Démarrage — appel IPC au chargement de la page
// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  await demarrerPartie()
})

// -------------------------------------------------------
// Fonctions
// -------------------------------------------------------

async function demarrerPartie() {
  // Le main génère un nouveau secret — le renderer ne le voit jamais
  await window.guessService.start()

  feedback.textContent      = ''
  feedback.className        = ''
  compteur.textContent      = 'Essais : 0'
  historique.innerHTML      = ''
  input.disabled            = false
  btnValider.disabled       = false
  btnNouvelle.style.display = 'none'
  sectionScore.style.display = 'none'
  essaisFinaux = 0

  input.focus()
}

async function verifier() {
  const nombre = parseInt(input.value)

  if (isNaN(nombre) || nombre < 1 || nombre > 100) {
    feedback.textContent = 'Entre un nombre entre 1 et 100.'
    feedback.className   = ''
    return
  }

  // Envoi au main via IPC — le main compare et renvoie le résultat
  const resultat = await window.guessService.check(nombre)

  // Mise à jour du compteur
  compteur.textContent = `Essais : ${resultat.essais}`

  // Ajout d'une ligne dans l'historique (cours Kamal — createElement / appendChild)
  const li = document.createElement('li')
  li.textContent = `Essai ${resultat.essais} : ${nombre}`
  historique.appendChild(li)

  // Feedback visuel (cours Kamal — classList)
  feedback.className = ''

  if (resultat.resultat === 'trop_grand') {
    feedback.textContent = 'Trop grand !'
    feedback.classList.add('trop_grand')

  } else if (resultat.resultat === 'trop_petit') {
    feedback.textContent = 'Trop petit !'
    feedback.classList.add('trop_petit')

  } else {
    // Gagné
    feedback.textContent = `Bravo ! Trouvé en ${resultat.essais} essais.`
    feedback.classList.add('gagne')
    input.disabled            = true
    btnValider.disabled       = true
    btnNouvelle.style.display = 'block'
    essaisFinaux              = resultat.essais

    // Afficher la section score et charger le top 5
    sectionScore.style.display = 'block'
    await afficherScores()
  }

  input.value = ''
  input.focus()
}

async function afficherScores() {
  // Récupère les scores depuis le fichier JSON (lecture faite dans main.js)
  const scores = await window.guessService.scores()

  listeScores.innerHTML = ''

  if (scores.length === 0) {
    listeScores.innerHTML = '<li>Aucun score enregistré.</li>'
    return
  }

  scores.forEach((score, index) => {
    const li = document.createElement('li')
    li.textContent = `${index + 1}. ${score.nom} — ${score.essais} essais (${score.date})`
    listeScores.appendChild(li)
  })
}

// -------------------------------------------------------
// Écouteurs d'événements (cours Kamal — addEventListener)
// -------------------------------------------------------

// Clic sur Valider
btnValider.addEventListener('click', verifier)

// Touche Entrée dans le champ (cours Kamal — keydown + event.key)
input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    verifier()
  }
})

// Bouton Nouvelle partie
btnNouvelle.addEventListener('click', demarrerPartie)

// Sauvegarde du score
btnSaveScore.addEventListener('click', async function() {
  const nom = inputNom.value.trim()

  if (!nom) {
    inputNom.focus()
    return
  }

  // Envoi au main via IPC — le main écrit dans scores.json
  await window.guessService.save(nom, essaisFinaux)

  inputNom.value = ''
  await afficherScores()
})
