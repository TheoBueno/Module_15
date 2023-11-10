const ATMDeposit = ({ onChange, isDeposit, isValid, atmMode }) => {
	const choice = ["Deposit","Cash Back"]
	/*   console.log(`ATM isDeposit: ${isDeposit}`); */
	return (
		<label className="label huge">
			<h3> {isDeposit} </h3>
			{atmMode && <input type="number" min='0' width="200" onChange={onChange}></input>}
			{atmMode && <input disabled={!isValid}  type="submit" width="200" value="Submit"></input>}
		</label>
	);
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
	const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
	const [atmMode, setAtmMode] = React.useState('')
	const [validTransaction, setValidTransaction] = React.useState(false);


	let status = `Account Balance $${totalState}`;
	console.log(`Account Rendered with isDeposit: ${isDeposit}`)
	const handleChange = event => {
		Number(event.target.value) <= 0 ? setValidTransaction(false) : 
    atmMode === 'Cash Back' && event.target.value > totalState ? 
		setValidTransaction(false) : setValidTransaction(true)
 
		console.log(`handleChange ${event.target.value}`);
		setDeposit(Number(event.target.value));
	};
	const handleSubmit = (event) => {

	let newTotal = 0
	atmMode === "Deposit" ? newTotal = deposit : 
	atmMode === "Cash Back" && deposit <= totalState ?  
	newTotal -= deposit : alert("Not Enough Funds") && setValidTransaction(false);
	setTotalState(totalState + newTotal); 

/* Original Code bellow, my code above
		 let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
		 setTotalState(newTotal)
		 setValidTransaction(false);
		event.preventDefault();
	};
*/ 
		event.preventDefault();
	};
 
	const handleModeSelect = (event) => {
    console.log(event.target.value)
    setAtmMode(event.target.value)
    event.target.value === Deposit ? setIsDeposit(true) : setIsDeposit(false)
    event.preventDefault();
  }

	return (
		<div class="base">
			<form onSubmit={handleSubmit}>
				<h2 id="total">{status}</h2>
					<label>Select an action below to continue: </label>
						<select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
						<option id="no-selection" value=""></option>
						<option id="deposit-selection" value="Deposit">Deposit</option>
						<option id="cashback-selection" value="Cash Back">Cash Back</option>
						</select>

						{atmMode && <ATMDeposit isValid={validTransaction} onChange={handleChange} isDeposit={isDeposit} atmMode={atmMode}></ATMDeposit>}
			</form>
		</div>
	);
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));

//On the declaration of the <ATMDeposit> component, use object destructuring to add a prop called isValid

			{/* <button onClick={() => setIsDeposit(true)}>Deposit</button>
			<button onClick={() => setIsDeposit(false)}>Cash Back</button> */}