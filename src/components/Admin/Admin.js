import React from 'react';
import Users from '../Users';

import UploadLineupPoster from '../Festival/UploadLineupPoster';
import FileUpload from '../FileUpload';

const Admin = () => {
    return (
        <div className='admin-page'>
            <h1>This is the Admin's Page</h1>
            <br />
            <Users />
            <br />
            <FileUpload />

            {/* <UploadLineupPoster /> */}
        </div>
    );
};

export default Admin;
