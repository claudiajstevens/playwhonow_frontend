import React, {useState} from 'react';

import Lineup from './Lineup';

const FestivalYearInfo = ( {festivalYear} ) => {
    const [showMore, setShowMore] = useState(false);

    console.log(festivalYear);
    const sDate = new Date();

    const formatDate = (date) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric'};
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString(undefined, options);
    }

    const getYear = (date) => {
        return new Date(date).getFullYear();
    }

    return (
        <div>
            <div className="festivalYear">
                <h3 key={festivalYear.id}>{getYear(festivalYear.startDate)}</h3>
                <button key={festivalYear.id} className="showMore" onClick={() => setShowMore(!showMore)}>
                    {showMore ? "View Less" : "View More" }
                </button>
            </div>
            <div className="festivalInfo">
                {showMore && (
                    <div>
                        <h4>{formatDate(festivalYear.startDate)} - {formatDate(festivalYear.endDate)}</h4>
                        <p>Lineup Here</p>
                        <Lineup lineupId = {festivalYear.id} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FestivalYearInfo;