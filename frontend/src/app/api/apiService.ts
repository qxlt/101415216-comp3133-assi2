import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  signUp(username: string, password: string, email: string): any {
    const mutation = `
      mutation {
        signup(username: "${username}", password: "${password}", email: "${email}") {
          id
          username
          email
        }
      }
    `;

    return this.http.post(this.baseUrl, { query: mutation });
  }

  login(username: string, password: string): any {
    const query = `
      query {
        login(username: "${username}", password: "${password}") {
          token
          user {
            id
            username
            email
          }
        }
      }
    `;
    return this.http.post(this.baseUrl, { query });
  }

  addNewEmp(
    first_name: string, 
    last_name: string, 
    email: string, 
    designation: string, 
    gender: string, 
    salary: number, 
    date_of_joining: string | Date, 
    department: string, 
    other: string, 
    employee_photo: string
  ): any {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    const mutation = `
      mutation {
        addNewEmp(
          first_name: "${first_name}", 
          last_name: "${last_name}", 
          email: "${email}", 
          gender: "${gender}",
          designation: "${designation}", 
          salary: ${salary}, 
          date_of_joining: "${date_of_joining}", 
          department: "${department}",
          other: "${other}", 
          employee_photo: "${employee_photo}"
        ) {
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            other
            employee_photo
        }
      }
    `;

    console.log("Sending GraphQL Mutation:\n", mutation);
  
    return this.http.post(this.baseUrl, { query: mutation }, { headers });
  }
  

  updateEmpById(
    eid: string,
    first_name: string,
    last_name: string,
    email: string,
    designation: string,
    gender: string,
    salary: number,
    date_of_joining: Date | string,
    department: string,
    other: string,
    employee_photo?: string
  ): any {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const mutation = `
      mutation {
        updateEmpById(
          eid: "${eid}",
          first_name: "${first_name}",
          last_name: "${last_name}",
          email: "${email}",
          gender: "${gender}",
          designation: "${designation}",
          salary: ${salary},
          date_of_joining: "${date_of_joining}",
          department: "${department}",
          other: "${other}",
          employee_photo: ${employee_photo ? `"${employee_photo}"` : null}
        )
      }
    `;
  
    return this.http.post(this.baseUrl, { query: mutation }, { headers });
  }
  

  getAllEmp(): any {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const query = `
      query {
        getAllEmp {
          id
          first_name
          last_name
          email
          gender
          designation
          salary
          date_of_joining
          department
          other
          employee_photo
        }
      }
    `;
    return this.http.post(this.baseUrl, { query }, { headers });
  }

  getEmpById(eid: string): any {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const query = `
      query {
        getEmpById(eid: "${eid}") {
          first_name
          last_name
          email
          gender
          designation
          salary
          date_of_joining
          department
          other
          employee_photo
        }
      }
    `;

    return this.http.post(this.baseUrl, { query }, { headers });
  }

  getEmpByDept(keyword: string): any {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const query = `
      query {
        getEmpByDept(keyword: "${keyword}") {
          id
          first_name
          last_name
          email
          gender
          designation
          salary
          date_of_joining
          department
          other
          employee_photo
        }
      }
    `;

    return this.http.post(this.baseUrl, { query }, { headers });
  }

  deleteEmp(eid: string): any {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const mutation = `
      mutation {
        deleteEmpById(eid: "${eid}")
      }
    `;
  
    return this.http.post(this.baseUrl, { query: mutation }, { headers });
  }


}
