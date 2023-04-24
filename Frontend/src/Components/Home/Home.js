import Services from './Services';
import Contact from './Contact';
import Scanner from '../../static/IMG/People.svg';
import Eqp from '../../static/IMG/room.svg';

export default function Home() {
    

    return (
        <div class="home">
        <section>
          <div class="welcome">
          <div class="welcome__text">
            <h2>Welcome to HHX</h2>
            <p> the first medical equipment tracking tool available on a website in Morocco. HHX is an innovative solution that is designed to help medical facilities and healthcare providers keep track of their medical equipment in an efficient and reliable way. By using HHX, medical facilities can easily monitor the location and status of their equipment, ensuring that it is always available when needed. With its user-friendly interface and powerful tracking capabilities, HHX is the ideal tool for any medical facility looking to streamline its operations and improve patient care.</p>
          </div>
          <div class="welcome__img">
            <img src={Eqp} alt="Welcome"/>  
          </div>
          </div>
        </section>

        <section>
          <Services/>
        </section>
        

        <section>
          <div class="about container">
            <h2>About Us</h2>
            <div class="row">
              <div class="col">
                <img src={Scanner} alt="About Us" />
              </div>
              <div class="col">
                <p>At our medical equipment tracking website, we are committed to providing the best service to our clients. We have developed a deep understanding of the challenges healthcare providers face when managing their equipment.</p>
                <p>Our team of experts is dedicated to helping our clients achieve their goals by providing them with the tools and resources they need to track their equipment, minimize downtime, and reduce costs. Whether you need help with inventory management, maintenance and repairs, equipment replacement, or training and support, we are here to help.</p>
                <p>Contact us today to learn more about our services and how we can help your healthcare facility.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Contact className="form" />
        </section>

      </div>
    )
}