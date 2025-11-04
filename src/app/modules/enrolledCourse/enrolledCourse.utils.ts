export const calculateGradePoints = (totalMarks: number) => {
    let result = {
        grade: 'NA',
        gradePionts: 0,
    };

    if (totalMarks >= 0 && totalMarks <= 19) {
        result = {
            grade: 'F',
            gradePionts: 0.00,
        };
    } else if (totalMarks >= 20 && totalMarks <= 39) {
        result = {
            grade: 'D',
            gradePionts: 2.00,
        };
    } else if (totalMarks >= 40 && totalMarks <= 59) {
        result = {
            grade: 'C',
            gradePionts: 3.00,
        };
    } else if (totalMarks >= 60 && totalMarks <= 79) {
        result = {
            grade: 'B',
            gradePionts: 3.50,
        };
    } else if (totalMarks >= 80 && totalMarks <= 100) {
        result = {
            grade: 'A',
            gradePionts: 4.00,
        };
    }

    return result;
};