const parser = new DOMParser();
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmDOM = parser.parseFromString(xmlString, "text/xml");

const list = xmDOM.querySelector("list");
const students = list.querySelectorAll("student");
const studentsList = [];

students.forEach ( everyStudent => {
  
  const name = everyStudent.querySelector("name");
  const language = name.getAttribute("lang");
  const firstName = everyStudent.querySelector("first");
  const secondname = everyStudent.querySelector("second");
  const proffesion = everyStudent.querySelector("prof");
  const ages = everyStudent.querySelector("age");
  
  studentsList.push ({
    
    name: firstName.textContent,
    prof: secondname.textContent,
    age: ages.textContent,
    lang: language,
    
    
    
  });
  
}); 

const result = {
  
    studentsList: studentsList
};

console.log('result', result)