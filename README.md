# Student Attendance Checker

A smart attendance monitoring and early intervention system that helps institutions, teachers, and students track attendance, predict academic risk (like debarment), and take timely corrective action.

---

## Overview

Attendance isn't just a routine formality—it's often linked to a student's academic performance and eligibility for examinations. Falling below a certain attendance threshold (commonly 75%) can result in **debarment**, meaning the student is disqualified from appearing in exams or continuing a course.

This project aims to solve that problem by providing a responsive web-based system that allows:

- **Tracking real-time attendance**
- **Predicting debarment risk using current trends**
- **Alerting students in advance**
- **Suggesting proactive corrective actions**

Built with **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**, the platform offers a clean, modern, and extensible interface suitable for educational institutions of any size.

---

## Why This Project Matters

Many students are unaware of their attendance status until it's too late. By the time they realize they're at risk of being debarred, corrective actions are either difficult or impossible. This application changes that by:

- **Visualizing attendance trends** clearly and regularly
- **Predicting future eligibility risks**
- **Helping students stay on track**
- **Reducing manual tracking efforts** for faculty and administrators

It empowers users with actionable insights—making attendance a tool for success rather than a cause for punishment.

---

## Key Features

- Add and update student records and attendance entries
- Real-time visualization of attendance status
- Status alerts:
  - **Safe** (Above 75%)
  - **Warning** (Between 60–75%)
  - **Critical** (Below 60%)
- Projected attendance trend analysis
- Suggestion of corrective actions
- Clean, mobile-friendly design

---

## Predictive Debarment Logic

The system evaluates the number of classes attended vs. total classes and provides predictions such as:

- **SAFE**: You are on track to meet attendance requirements
- **WARNING**: At risk of falling below threshold soon
- **CRITICAL**: Debarment likely if attendance doesn't improve

It also calculates how many consecutive classes a student must attend to get back to a safe status.

---

## Suggested Corrective Actions

- Prioritize attending all future classes
- Attend optional/remedial or makeup sessions
- Submit valid medical or academic leave documentation
- Consult with faculty or academic counselors
- Join attendance recovery initiatives if available

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/immortaleyes/student-attendance-checker.git
   ```

2. Navigate to the project folder:
   ```bash
   cd student-attendance-checker
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **Version Control**: GitHub

---

## Author

**Ajay Shriram Kushwaha**  
**Email**: [Kushwaha.ajay22@gmail.com](mailto:Kushwaha.ajay22@gmail.com)  
**Copyright** © Ajay Shriram Kushwaha

---

Empowering students with insights. Enabling teachers with tools. Enhancing education with smart data.
