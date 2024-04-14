const submitButton = document.querySelector("#submit-btn");
const popup = document.querySelector(".pop-up");
const closeButton = document.querySelector(".close-btn");

if (closeButton) {
  closeButton.addEventListener("click", () => {
    popup.style.display = "none";
  });
}

if (submitButton) {
  submitButton.addEventListener("click", () => {
    const annualIncomeInput = document.querySelector("#annual-income");
    const extraIncomeInput = document.querySelector("#extra-income");
    const deductionInput = document.querySelector("#applicable-deduction");
    const ageSelect = document.querySelector("#age");

    const annualIncome = parseFloat(annualIncomeInput.value);
    const extraIncome = parseFloat(extraIncomeInput.value);
    const deductions = parseFloat(deductionInput.value);

    const isValid =
      !isNaN(annualIncome) &&
      !isNaN(extraIncome) &&
      !isNaN(deductions) &&
      !isNaN(parseInt(ageSelect.value));

    if (isValid) {
      popup.style.display = "block";
      calculateTaxApplicable();
    } else {
      alert("Please fill all the fields with correct numeric values.");
    }
  });
}

document.querySelector("#extra-income").addEventListener("input", () => {
  const inputValue = parseFloat(document.querySelector("#extra-income").value);
  const errorIcon = document.getElementById("extra-income-error-icon");

  if (isNaN(inputValue) || inputValue <= 0) {
    errorIcon.style.display = "block";
  } else {
    errorIcon.style.display = "none";
  }
});

document.querySelector("#annual-income").addEventListener("input", () => {
  const inputValue = parseFloat(document.querySelector("#annual-income").value);
  const errorIcon = document.getElementById("annual-error-icon");

  if (isNaN(inputValue) || inputValue <= 0) {
    errorIcon.style.display = "block";
  } else {
    errorIcon.style.display = "none";
  }
});

document
  .querySelector("#applicable-deduction")
  .addEventListener("input", () => {
    const inputValue = parseFloat(
      document.querySelector("#applicable-deduction").value
    );
    const errorIcon = document.getElementById("deduction-error-icon");

    if (isNaN(inputValue) || inputValue < 0) {
      errorIcon.style.display = "block";
    } else {
      errorIcon.style.display = "none";
    }
  });

function calculateTaxApplicable() {
  const annualIncome = parseFloat(
    document.querySelector("#annual-income").value
  );
  const extraIncome = parseFloat(document.querySelector("#extra-income").value);
  const deductions = parseFloat(
    document.querySelector("#applicable-deduction").value
  );
  const age = parseInt(document.querySelector("#age").value);

  if (
    isNaN(annualIncome) ||
    isNaN(extraIncome) ||
    isNaN(deductions) ||
    isNaN(age)
  ) {
    document.querySelector(
      "#tax-amount"
    ).innerHTML = `Please fill all the fields with correct numeric values`;
    return;
  }

  const totalIncome = annualIncome + extraIncome;
  const totalDeductions = deductions;

  const taxableIncome = totalIncome - totalDeductions;

  let tax;
  if (taxableIncome > 800000) {
    if (age === 1) {
      tax = (taxableIncome - 800000) * 0.3;
    } else if (age === 2) {
      tax = (taxableIncome - 800000) * 0.4;
    } else {
      tax = (taxableIncome - 800000) * 0.1;
    }
  } else {
    document.querySelector(
      "#tax-amount"
    ).innerHTML = `No tax amount is applicable `;
    const totalIncomeElement = document.createElement("p");
    totalIncomeElement.innerHTML = `Your total income is ${taxableIncome}`;
    document.querySelector("#tax-amount").appendChild(totalIncomeElement);
    return;
  }

  document.querySelector(
    "#tax-amount"
  ).innerHTML = `Your final tax amount is ${tax}`;
  const totalIncomeElement = document.createElement("p");
  totalIncomeElement.innerHTML = `Your total income after tax is ${
    totalIncome - tax
  }`;
  document.querySelector("#tax-amount").appendChild(totalIncomeElement);
}
