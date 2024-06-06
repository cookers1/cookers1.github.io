window.onload = function() {
    const savedApiKey1 = localStorage.getItem('apiKey');
}

async function submitApiKey() {
  const apiKey = document.getElementById('apiKey').value;
  if (!apiKey) {
      alert("Please enter an API key.");
      return;
  }

  const url = `https://api.torn.com/user/?selections=battlestats&key=${apiKey}&comment=TryItPage`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      localStorage.setItem(`apiKey`, apiKey);

      displayBattleStats(data);
  } catch (error) {
      console.error("Error fetching battle stats:", error);
      alert("Error fetching battle stats. Please check your API key and try again.");
  }
}

function displayBattleStats(data) {
  const statsContainer = document.getElementById('statsContainer');
  if (data.error) {
      statsContainer.innerText = `Error: ${data.error.error}`;
      return;
  }
  const formattedStrength = data.strength.toLocaleString();
  const formattedSpeed = data.speed.toLocaleString();
  const formattedDefense = data.defense.toLocaleString();
  const formattedDexterity = data.dexterity.toLocaleString();
  const formattedTotal = data.total.toLocaleString();

  const statsHtml = `
      <p>Strength: ${formattedStrength}</p>
      <p>Speed: ${formattedSpeed}</p>
      <p>Defense: ${formattedDefense}</p>
      <p>Dexterity: ${formattedDexterity}</p>
      <p>Total: ${formattedTotal}</p>
  `;
  statsContainer.innerHTML = statsHtml;
}  