import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Style from '../Styles/Seat.module.css'

const Seat = () => {
  const [num, setnum] = useState()
  const [data, setdata] = useState([])
  const [seats, setSeats] = useState(0)


  const handleSubmit = async () => {
    try {
      let res = await axios.post(`https://tame-pink-boa-slip.cyclic.app/`, { number: num })
      console.log(res.data)
      if(!res.data.position)
      alert("Sorry, seats Not available")
      setSeats(res.data.position)
      getData()
    }
    catch (err) {
      console.log(err)
      alert("Something went wrong, Please try again")
    }
  }

  const getData = async () => {
    let result = await axios.get(`https://tame-pink-boa-slip.cyclic.app/`)
    setdata(result.data)
  }

  useEffect(() => {
    getData()
    console.log(data)
  }, [num])

  return (
    <div>
      <div className={Style.inputBox}> 

      {!seats ?
          <h2>Confirm Seat Availablity</h2>
          :
          <h3>Booking Done from Seat Number : {seats} to  {seats+(+num-1)}</h3>
            
        }
        <input type="number" onChange={(e) => {
          if (e.target.value <= 7 && e.target.value >= 0) {
            setnum(e.target.value)
          } else {
            alert("One person can reserve up to 7 seats at a time")
          }
        }} value={num} placeholder='Number of Seats' />

        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div id={Style.container}>
        {data && data.map((el) => (
          <div style={{ backgroundColor: el.availability ? "red" : "green" }} key={el.seatNo}>{el.seatNo}</div>
        ))}
      </div>
      <div>
        <br />
      </div>
    </div>
  )
}

export default Seat
