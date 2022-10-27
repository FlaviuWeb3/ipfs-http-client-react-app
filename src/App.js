import './App.css'
import { useState } from 'react'
import { create } from 'ipfs-http-client'
import {Buffer} from 'buffer'

const projectId = 'YOUR_CREDENTIALS';
const projectSecret = 'YOUR_CREDENTIALS';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  }
})
function App() {
  const [fileUrl, updateFileUrl] = useState('')
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://[your_dedicated_gateway_name].infura-ipfs.io/ipfs/${added.path}`
      updateFileUrl(url)
      console.log(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  return (
    <div className="App">
      <h1>IPFS Example</h1>
      
      <input
        type="file"
        onChange={onChange}
      />
      {
        
        fileUrl && (
          <img src={fileUrl} width="600px" /> 
        )
      }
      <p>{fileUrl}</p>
      
    </div>
  );
}
export default App