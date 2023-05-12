import axios from "axios";

export default axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    tokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMjgiLCJIZXRIYW5TdHJpbmciOiIwNi8wOC8yMDIzIiwiSGV0SGFuVGltZSI6IjE2OTEyODAwMDAwMDAiLCJuYmYiOjE2NzI5MzgwMDAsImV4cCI6MTY5MTQyNzYwMH0.1IXShq-PS4U5xC7QUMQLQcPPHNDmZrXfqvEBkJOEvEw'
  },
});