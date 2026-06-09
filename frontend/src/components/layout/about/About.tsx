import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <h1>About The Project</h1>

      <section className="about-section">
        <p>
          This frontend is a React dashboard for mission 3. It integrates with the backend
          API to manage meetings per group. Users can browse group schedules, add a new
          meeting, and remove outdated entries.
        </p>
        <br />
        <p>
          The app is built with TypeScript and React Router, and communicates with the
          server using Axios. The focus is a clear flow from selecting a group to managing
          its meetings quickly.
        </p>
      </section>

      <section className="developer-section">
        <h2>Developer</h2>
        <p>
          <b>Project:</b> Mission 3 Meetings Manager
        </p>
        <p>
          <b>Programmer:</b> zohar
        </p>
        <p>
          <b>Stack:</b> React, TypeScript, Axios
        </p>
      </section>
    </div>
  );
}