import React from 'react';
import { Table } from 'react-bootstrap';
import '../style/history.css'


function ShowHistory(props) {
    return (
        <div className="historyPage">
            
            <h1>History</h1>
            <img className="theme_img" src="photoNew.png" alt="backgroundimage" />

            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>#index</th>
                        <th>Blog Name</th>
                        <th>Type</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.historyArray.map((his, i) => (
                        <tr key={i}>
                            <td>{i}</td>
                            <td>{his.titleBlog}</td>
                            <td>{his.type}</td>
                            <td>{his.date}</td>
                        </tr>
                    ))}

                </tbody>
            </Table>

        </div>
    )
}

export default ShowHistory;
