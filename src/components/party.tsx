import React from 'react'
import { useState, useEffect} from 'react';
import '../styles/styles.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Paper from '@mui/material/Paper';
export default function Party() {
    const locations = [
        {index:1, location: "Romeo Lane", link: "https://www.zomato.com/ncr/romeo-lane-civil-lines-new-delhi"},
        {index:2, location: "Fiery Grills", link: "https://www.zomato.com/ncr/fiery-grills-netaji-subhash-place-new-delhi"}
    ]
    const [votes, setVotes] = useState<any[]>([])
    const handleclosedialog = () =>{
        setShowForm(false);
    }
    const data  = async() =>{
        const response= await axios.get("http://localhost:8080/users");
        const data = response.data;
        let romeoLane=0;
        let fierygrills=0;
        for(const item of data){
            const i:any =item;
            console.log(i.location)
            console.log(item)
            if(i.location === "Romeo Lane"){
                romeoLane++;
            }
            else{
                fierygrills++;
            }
        }
        setFormData({...formData, totalromeo:romeoLane, totalfiery:fierygrills})
        const filtered = [...new Set(data)]
        setVotes(filtered);
    }
    data();
    const submitDetails = async(e : React.FormEvent)=>{
        e.preventDefault();
        if(formData.name.length>0 && formData.votedFor.length>0){
            const result = await axios.post("http://localhost:8080/users",{
                name: formData.name,
                location: formData.votedFor
            })
        }
       
        console.log("form submitted");
        setShowForm(false);
        const response= await axios.get("http://localhost:8080/users");
        const data = response.data;
        let romeoLane=0;
        let fierygrills=0;
        for(const item of data){
            const i:any =item;
            console.log(i.location)
            console.log(item)
            if(i.location === "Romeo Lane"){
                romeoLane++;
            }
            else{
                fierygrills++;
            }
        }
        setFormData({...formData, totalromeo:romeoLane, totalfiery:fierygrills})
        const filtered = [...new Set(data)]
        setVotes(filtered);
    }
    const [formData, setFormData] = useState({
        name: "",
        votedFor: "",
        totalromeo:0,
        totalfiery:0
    })
    useEffect(() => {
        console.log(formData)
    }, [formData])
    const [showForm, setShowForm] = useState(false);
    return (
        <>
        <div className={"budget-container"}>
            Total Budget: 5500
        </div>
        <div className={"table-container"}>
        <Table>
            <TableHead>
            <TableRow>
            <TableCell sx={{fontWeight: 'bold'}}>S No.</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Location</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Location link</TableCell>
          </TableRow>
            </TableHead>
            
            {locations.map((item:any)=>(
                <>
                <TableBody>
                <TableCell>{item.index}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell><a target={'_blank'} href={item.link}>Click here</a></TableCell>
                </TableBody>
                </>
            ))}
           
        </Table>
        </div>
        <div className={"btn-container"}> 
        <button onClick={(e)=>{e.preventDefault(); setShowForm(true)}} className={"vote-btn"}>Vote</button>
        </div>
        <Dialog open={showForm} onClose={handleclosedialog}>
  <DialogContent>
    <form onSubmit={(e) => submitDetails(e)} className="form-container">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Choose location</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="location"
              value="Romeo Lane"
              onChange={(e) => setFormData({ ...formData, votedFor: e.target.value })}
            />
            Romeo Lane
          </label>
          <label>
            <input
              type="radio"
              name="location"
              value="Fiery Grills"
              onChange={(e) => setFormData({ ...formData, votedFor: e.target.value })}
            />
            Fiery Grills
          </label>
        </div>
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  </DialogContent>
</Dialog>
<div className="table-container">
    <Table>
        <TableHead>
            <TableRow>
                <TableCell sx={{fontWeight: 'bold'}}>S No.</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Voted for</TableCell>
            </TableRow>
        </TableHead>
        {votes.map((item: any)=>(
            <TableBody>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.location}</TableCell>
            </TableBody>
        ))}
    </Table>
</div>
            <div className="vote-container">
               <p>Total votes for romeo: {formData.totalromeo}</p>
               <hr />
               <p>Total votes for Fiery Grills: {formData.totalfiery}</p>
            </div>
        </>
    )
}
