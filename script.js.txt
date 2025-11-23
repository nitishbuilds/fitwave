function fmt(n){ return Math.round(n); }

document.getElementById("planBtn").addEventListener("click", () => {

    const gender = gender.value;
    const ageV = Number(age.value);
    const h = Number(height.value);
    const w = Number(weight.value);
    const goalV = goal.value;
    const gymV = gym.value;
    let protPref = proteinPref.value;

    const bmi = w / ((h/100)**2);

    let bmr = gender==="male"
      ? 10*w + 6.25*h - 5*ageV + 5
      : 10*w + 6.25*h - 5*ageV - 161;

    let activity = gymV==="yes" ? 1.55 : gymV==="sometimes" ? 1.45 : 1.35;
    let maintenance = bmr * activity;

    let cal = maintenance;
    if(goalV==="build") cal+=300;
    if(goalV==="lean_bulk") cal+=150;
    if(goalV==="lose") cal-=400;
    if(goalV==="endurance") cal+=120;

    let protKG = goalV==="build" ? 2.0 : goalV==="lose" ? 1.8 : 1.6;
    if(protPref!=="auto") protKG = Number(protPref);

    let proteinG = protKG * w;
    let fatG = (cal*0.25)/9;
    let carbG = (cal - proteinG*4 - fatG*9)/4;

    let wk = generateWorkout(goalV);

    let html = `
      <strong>Your Summary</strong><br>
      BMI: ${fmt(bmi)}<br>
      Calories: ${fmt(cal)} kcal<br>
      <hr>
      <strong>Macros</strong><br>
      Protein: ${fmt(proteinG)}g (${protKG} g/kg)<br>
      Fat: ${fmt(fatG)}g<br>
      Carbs: ${fmt(carbG)}g<br>
      <hr>
      <strong>Workout Plan (Weekly)</strong><ul>
    `;
    wk.forEach(d => html += `<li>${d}</li>`);

    html += `</ul>`;

    result.innerHTML = html;
});


function generateWorkout(goal){
  if(goal==="build"||goal==="lean_bulk"){
    return ["Push Day","Pull Day","Legs + Core","Rest","Upper Pump","Walk/Cardio","Rest"];
  }
  if(goal==="lose"){
    return ["Full Body","HIIT","Core + LISS","Strength","Cardio","Walk 8k","Rest"];
  }
  if(goal==="endurance"){
    return ["Tempo Run","Strength Light","Long Run","Cycling","Jog","Walk","Rest"];
  }
  return ["Full Body","Cardio","Rest","Upper Body","Cardio","Walk","Rest"];
}
