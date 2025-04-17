const webhookURL = "https://discord.com/api/webhooks/1362299792843079843/DhLOyoWdpV5p2L9YwJd1yczoLtMSnfcgaBAQ47fQ1W0ju2RZrakCyHSpQ77sGtGEFihL";

document.getElementById('Pokeform').addEventListener('submit', function (e) {
  e.preventDefault();

  const mon = document.getElementById('mon').value.trim();
  const levelno = document.getElementById('levelno').value.trim();
  const evolve = document.getElementById('evolve').value.trim();
  const ev = document.getElementById('ev').value.trim();
  const IGN = document.getElementById('IGN').value.trim();
  const extra = document.getElementById('extra').value.trim();

  if (!mon || !levelno || !evolve || !ev || !IGN) {
    alert("Please fill out all required fields.");
    return;
  }

  const payload = {
    username: "Trynexis",
    embeds: [
      {
        title: "📬 New PokeMMO Service Request",
        description: "A new user has submitted their leveling request.",
        color: 0x00ff99,
        fields: [
          { name: "1) Pokémon", value: mon },
          { name: "2) Leveling Plan", value: levelno },
          { name: "3) Evolve?", value: evolve },
          { name: "4) EV Training", value: ev },
          { name: "5) IGN", value: IGN },
          { name: "6) Extra Info", value: extra || "None" }
        ],
        footer: {
          text: "Trynexis' EV & XP Services"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(async res => {
      if (res.ok) {
        console.log("Form submitted");
        document.getElementById('successMessage').style.display = 'block';
      } else {
        const errorData = await res.json();
        console.error("Discord API error:", errorData);
        alert("Form failed to send. See console for details.");
      }
    })
    .catch(err => {
      console.error("Network error:", err);
      alert("Network error occurred.");
    });
});
