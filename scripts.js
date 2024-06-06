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
  const effectiveStrength = (data.strength * (1 + data.strength_modifier / 100)).toLocaleString();
  const effectiveSpeed = (data.speed * (1 + data.speed_modifier / 100)).toLocaleString();
  const effectiveDefense = (data.defense * (1 + data.defense_modifier / 100)).toLocaleString();
  const effectiveDexterity = (data.dexterity * (1 + data.dexterity_modifier / 100)).toLocaleString();
  const effectiveTotal = ((data.dexterity * (1 + data.dexterity_modifier / 100)) 
  + (data.defense * (1 + data.defense_modifier / 100)) + (data.speed * (1 + data.speed_modifier / 100)) 
  + (data.strength * (1 + data.strength_modifier / 100))).toLocaleString();
  const statsHtml = `
      <p>Strength: ${formattedStrength}    ---    Effective Strength:${effectiveStrength} </p>
      <p>Speed: ${formattedSpeed}    ---    Effective Speed: ${effectiveSpeed} </p>
      <p>Defense: ${formattedDefense}    ---    Effective Defense: ${effectiveDefense} </p>
      <p>Dexterity: ${formattedDexterity}    ---    Effective Dexterity: ${effectiveDexterity}</p>
      <p>Total: ${formattedTotal}    ---    Effective Total: ${effectiveTotal} </p>
      <p>Modifiers:</p>
      <p>Strength modifier:${data.strength_modifier}%</p>
      <ul>${data.strength_info.map(info => `<li>${info}</li>`).join('')}</ul>
      <p>Speed modifier:${data.speed_modifier}%</p>
      <ul>${data.speed_info.map(info => `<li>${info}</li>`).join('')}</ul>
      <p>Defense modifier:${data.defense_modifier}%</p>
      <ul>${data.defense_info.map(info => `<li>${info}</li>`).join('')}</ul>
      <p>Dexterity modifier:${data.dexterity_modifier}%</p>
      <ul>${data.dexterity_info.map(info => `<li>${info}</li>`).join('')}</ul>

  `;
  statsContainer.innerHTML = statsHtml;
}  