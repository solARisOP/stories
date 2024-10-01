import axios from "axios"

const fun = async () => {
    const url = 'https://images.pexels.com/photos/28620168/pexels-photo-28620168/free-photo-of-elegant-dining-table-setting-with-floral-centerpiece.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
    try {
        const response = await axios.get(url)
        console.log(response);
        
        const rangeResponse = await axios.get(url, {
            headers: {
                'Range': 'bytes=0-1023' // Fetch the first 1024 bytes
            },
            responseType: 'arraybuffer' // Ensure we get the response as an ArrayBuffer
        });
        
        const arrayBuffer = rangeResponse.data;
        const uint8Array = new Uint8Array(arrayBuffer);

        // Step 4: Convert the first few bytes to a hexadecimal string (file signature)
        const fileSignature = Array.from(uint8Array.slice(0, 4)) // Get first 4 bytes
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join(' ');

        console.log('File Signature:', fileSignature);

        // Common video file signatures
        const signatures = {
            'mp4': '00 00 00 1c',  // MP4
            'webm': '1a 45 df a3', // WebM
            'mov': '00 00 00 20',  // MOV
            // Add other file types as needed
            'jpg': 'ff d8 ff e0',  // JPEG
            'png': '89 50 4e 47',  // PNG
            'gif': '47 49 46 38',  // GIF
            'bmp': '42 4d',        // BMP
            'svg': '3c 73 76 67',  // SVG
        };
    } catch (error) {
        console.log(error.response);
    }
}

await fun()