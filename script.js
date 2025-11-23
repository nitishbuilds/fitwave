function fmt(n){ return Math.round(n); }

document.getElementById("planBtn").addEventListener("click", () => {

    const gender = document.getElementById("gender").value;
    const ageV = Number(document.getElementById("age").value);
    const h = Number(document.getElementById("height").value);
    const w = Number(document.getElementById("weight").value);
    const goalV = document.getElementById("goal").value;
    const gymV = document.getElementById("gym").value;
    let protPref = document.getElementById("proteinPref").value;

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

    let plan = generateWorkout(goalV);

    document.getElementById("result").innerHTML = `
      <strong>Your Summary</strong><br>
      BMI: ${fmt(bmi)}<br>
      Calories: ${fmt(cal)} kcal<br>
      <hr>
      <strong>Macros</strong><br>
      Protein: ${fmt(proteinG)}g (${protKG} g/kg)<br>
      Fat: ${fmt(fatG)}g<br>
      Carbs: ${fmt(carbG)}g<br>
      <hr>
      <strong>Weekly Plan</strong>
      <ul>${plan.map(d=>`<li>${d}</li>`).join('')}</ul>
    `;
});

function generateWorkout(goal){
  if(goal==="build"||goal==="lean_bulk"){
    return ["Day1: Push (compound)","Day2: Legs","Day3: Rest/light cardio","Day4: Pull","Day5: Full body accessory","Day6: Active recovery","Day7: Rest"];
  }
  if(goal==="lose"){
    return ["Day1: Full body","Day2: HIIT 20 min","Day3: Strength","Day4: LISS 40 min","Day5: Full body","Day6: Walk/yoga","Day7: Rest"];
  }
  if(goal==="endurance"){
    return ["Day1: Tempo run/cycle","Day2: Strength-light","Day3: Long steady cardio","Day4: Cross-train","Day5: Intervals","Day6: Easy active","Day7: Rest"];
  }
  return ["Day1: Full body","Day2: Cardio 30 min","Day3: Mobility","Day4: Upper","Day5: Lower","Day6: Light cardio","Day7: Rest"];
}
