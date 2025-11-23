document.getElementById("generateBtn").addEventListener("click", function () {

    let age = Number(document.getElementById("age").value);
    let height = Number(document.getElementById("height").value) / 100;
    let weight = Number(document.getElementById("weight").value);
    let goal = document.getElementById("goal").value;

    let bmi = (weight / (height * height)).toFixed(1);
    let calories = Math.round(weight * 33);
    let protein = Math.round(weight * 2);

    let plan = `
      <b>Your Summary</b><br>
      BMI: ${bmi}<br>
      Calories: ${calories} kcal<br><br>

      <b>Macros</b><br>
      Protein: ${protein} g (2 g/kg)<br><br>

      <b>Weekly Plan</b><br>
      Day1: Push (compound)<br>
      Day2: Legs<br>
      Day3: Rest/light cardio<br>
      Day4: Pull<br>
      Day5: Full body accessory<br>
      Day6: Active recovery<br>
      Day7: Rest
    `;

    document.getElementById("result").innerHTML = plan;
});
