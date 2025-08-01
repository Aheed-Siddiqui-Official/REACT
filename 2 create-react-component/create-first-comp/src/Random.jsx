function Random() {
  let number = Math.random() * 100;

  return <p style={{backgroundColor: "green"}}>
    Random Number is : {Math.round(number)}</p>
}

export default Random;