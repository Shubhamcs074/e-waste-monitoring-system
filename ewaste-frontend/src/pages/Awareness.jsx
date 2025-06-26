import React from 'react';
import './awareness.css'; // optional styling
import Header from '../components/Header';

const Awareness = () => {
  return (<>
    <Header/>
    <div className="awareness-container">
      <h2>♻️ E-Waste Awareness</h2>

      <section>
        <h3>📉 Why E-Waste is a Problem</h3>
        <p>
          Every year, millions of tons of electronic waste are discarded, with many containing hazardous substances like lead, mercury, and cadmium. Improper disposal pollutes our soil, water, and air.
        </p>
      </section>

      <section>
        <h3>☣️ Health Hazards</h3>
        <p>
          Toxic materials in e-waste can cause respiratory issues, skin problems, and even long-term damage to the nervous system and kidneys when not handled properly.
        </p>
      </section>

      <section>
        <h3>🌿 How Recycling Helps</h3>
        <p>
          Certified recyclers recover valuable materials like gold, copper, and rare earth metals from devices, reducing the need for raw mining and promoting a circular economy.
        </p>
      </section>

      <section>
        <h3>🧑‍💻 What You Can Do</h3>
        <ul>
          <li>Use electronics responsibly and avoid early disposal</li>
          <li>Register your obsolete devices on this platform</li>
          <li>Choose certified recyclers only</li>
        </ul>
      </section>

      <section>
        <h3>🌍 SDG Goals Supported</h3>
        <ul>
          <li><strong>Goal 3:</strong> Good Health and Well-being</li>
          <li><strong>Goal 12:</strong> Responsible Consumption and Production</li>
        </ul>
      </section>
    </div>
    </>
  );
};

export default Awareness;
