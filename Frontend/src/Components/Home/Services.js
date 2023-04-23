import { useContext } from "react";
import { AuthContext } from "../Control Panel/Auth-Context";


 export default function Services(){
    return(
        <div className="services">
            <h1>Our Services</h1>
            <p class="first_p">At our medical equipment management company, we offer a range of services to help healthcare providers manage their equipment effectively and efficiently. Our services include:</p>
            
            <div class="card-container">
                <div class="card">
                <div class="card-content">
                    <h2>Equipment Inventory Management</h2>
                    <p>We help healthcare facilities keep track of their equipment inventory, including maintenance schedules, warranties, and replacement schedules.</p>
                </div>
                </div>
                
                <div class="card">
                <div class="card-content">
                    <h2>Maintenance and Repairs</h2>
                    <p>We provide comprehensive maintenance and repair services to keep equipment functioning optimally and minimize downtime.</p>
                </div>
                </div>
                
                <div class="card">
                <div class="card-content">
                    <h2>Equipment Replacement</h2>
                    <p>We can help healthcare facilities identify when equipment needs to be replaced and assist with the procurement and installation of new equipment.</p>
                </div>
                </div>
                
                <div class="card">
                <div class="card-content">
                    <h2>Training and Support</h2>
                    <p>We offer training and support services to help healthcare providers make the most of their equipment and ensure staff are properly trained in its use.</p>
                </div>
                </div>
            </div>
            
            <p>Contact us to learn more about how our services can benefit your healthcare facility.</p>
        </div>
    )
 }