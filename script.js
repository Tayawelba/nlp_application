// Le code JavaScript qui appelle l'API Hugging Face
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-fr-en",
		{
			headers: { Authorization: "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

// La fonction qui gère l'envoi du formulaire
function handleSubmit(event) {
  // On empêche le comportement par défaut du formulaire (recharger la page)
  event.preventDefault();
  // On récupère la valeur du champ de texte
  const texte = document.getElementById("texte").value;
  // On appelle la fonction query avec le texte comme paramètre
  query({"inputs": texte}).then((response) => {
    // On récupère la traduction du texte
    const traduction = response[0].generated_text;
    // On affiche la traduction dans une boîte de dialogue
    alert(traduction);
  });
}

// On ajoute un écouteur d'événement submit sur le formulaire
document.getElementById("formulaire").addEventListener("submit", handleSubmit);
