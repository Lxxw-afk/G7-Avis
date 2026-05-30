const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1510214205213773965/rUCGMv0kRW4vHkxL3Wz2Cmx2UXfIMb6OI0uGyWw51g7pLHattu7b3nVoIVc3ZT6L-QK";

const form = document.getElementById("reviewForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const comment = document.getElementById("comment").value.trim();
  const rating = document.querySelector('input[name="rating"]:checked');

  if (!name || !comment || !rating) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const stars = "⭐".repeat(Number(rating.value));

  const discordMessage = {
    username: "Avis Taxi G7",
    embeds: [
      {
        title: "🚖 Nouvel avis client",
        color: 16236544,
        fields: [
          {
            name: "👤 Client",
            value: name,
            inline: true
          },
          {
            name: "⭐ Note",
            value: `${stars} ${rating.value}/5`,
            inline: true
          },
          {
            name: "💬 Commentaire",
            value: comment
          },
          {
            name: "📅 Date",
            value: new Date().toLocaleString("fr-FR")
          }
        ]
      }
    ]
  };

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(discordMessage)
    });

    successMessage.style.display = "block";
    form.reset();

  } catch (error) {
    alert("Erreur lors de l'envoi vers Discord.");
    console.error(error);
  }
});
