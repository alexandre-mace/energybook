import React from 'react';

const PictoGenerator = ({name, img, total, size = 20}) => (
    <>
        {
            [...Array(Math.ceil(total))].map((e, i) =>
                <img key={i} style={{width: size, height: size}}  src={img} alt={`${name} power plant`}/>
            )
        }
    </>
)
export default PictoGenerator;