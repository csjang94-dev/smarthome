async function fetchMain() {
    try {
        
        

    } catch (error) {
        console.error('문제를 불러오는 중 오류 발생:', error);
        questions.textContent = '데이터를 불러오는데 실패했습니다.';
        
    }
}

fetchMain();