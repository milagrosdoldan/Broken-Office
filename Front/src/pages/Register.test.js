import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {render, screen} from "../test-utils"

import Register from "./Register"

describe("Register", ()=>{
    test("Render Register", ()=>{
        const componente = render( <BrowserRouter>
            <Routes>   
                <Route path="*" element= {<Register />}/>
            </Routes>
        </BrowserRouter>)
        console.log(componente)
    })
})