// -------------------------------------------------------
// TOUTE LA LOGIQUE EST ICI, DANS LE RENDERER
// Le nombre secret est une variable JS visible depuis la console
// -------------------------------------------------------

// Génération du nombre secret — visible dans la console avec : secret
let secret = Math.floor(Math.random() * 100) + 1
let attempts = 0

// Récupération des éléments du DOM (cours Kamal — section 2.2)
const input = document.getElementById('input-nombre')
const btnValider = document.getElementById('btn-valider')
const feedback = document.getElementById('feedback')
const compteur = document.getElementById('compteur')
const historique = document.getElementById('historique')
const btnNouvelle = document.getElementById('btn-nouvelle-partie')

// Fonction qui traite une tentative
function verifier() {
  const nombre = parseInt(input.value)

  if (isNaN(nombre) || nombre < 1 || nombre > 100) {
    feedback.textContent = 'Entre un nombre entre 1 et 100.'
    feedback.className = ''
    return
  }

  attempts++

  // Mise à jour du compteur
  compteur.textContent = `Essais : ${attempts}`

  // Ajout d'une ligne dans l'historique (cours Kamal — createElement / appendChild)
  const li = document.createElement('li')
  li.textContent = `Essai ${attempts} : ${nombre}`
  historique.appendChild(li)

  // Comparaison et feedback (cours Kamal — classList)
  feedback.className = ''   // reset les classes couleur

  if (nombre > secret) {
    feedback.textContent = 'Trop grand !'
    feedback.classList.add('trop_grand')
  } else if (nombre < secret) {
    feedback.textContent = 'Trop petit !'
    feedback.classList.add('trop_petit')
  } else {
    feedback.textContent = `Bravo ! Trouvé en ${attempts} essais.`
    feedback.classList.add('gagne')
    input.disabled = true
    btnValider.disabled = true
    btnNouvelle.style.display = 'block'
  }

  input.value = ''
  input.focus()
}

// Écoute du clic sur le bouton Valider (cours Kamal — addEventListener)
btnValider.addEventListener('click', verifier)

// Écoute de la touche Entrée dans le champ (cours Kamal — keydown + event.key)
input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    verifier()
  }
})

// Bouton Nouvelle partie — remet tout à zéro
btnNouvelle.addEventListener('click', function () {
  secret = Math.floor(Math.random() * 100) + 1
  attempts = 0

  feedback.textContent = ''
  feedback.className = ''
  compteur.textContent = 'Essais : 0'
  historique.innerHTML = ''
  input.disabled = false
  btnValider.disabled = false
  btnNouvelle.style.display = 'none'
  input.focus()
})
