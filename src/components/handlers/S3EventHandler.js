// import React, {useEffect} from 'react';
// import AWS from './aws.config';

// const S3EventHandler = () => {
//     useEffect( () => {
//         const s3 = new AWS.S3();

//         const params = {
//             Bucket: 'lineup-posters',
//         };

//         const eventHandler = s3
//             .waitFor('objectCreated', params)
//             .promise()
//             .then( (data) => {
//                 // Handle the event data, e.g., extract object key, bucket name, etc.
//                 const objectKey = data.Key;
//                 const bucketName = data.Bucket;
//             })
//     })
    
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default S3EventHandler;
