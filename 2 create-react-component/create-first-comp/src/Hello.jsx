function Hello() {

  let myName = "MAS"
  let number = 123
  let fullname = () => {
    return 'MAS';
  }

  return <h3>
    Hello MAS!. Iam {myName}. No is {number}. Fullname {fullname()}
  </h3>
}

export default Hello;