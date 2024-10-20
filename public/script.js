// Axios CDN을 사용하려면 브라우저 환경에서 아래 스크립트를 포함하세요.
// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

// 신용 데이터 입력 (테스트용 데이터)
const creditData = {
    paymentHistory: "12 months no late payments",
    debtRatio: "20%",
    creditHistoryLength: "5 years",
    newCreditInquiries: "1"
};

// OpenAI API 호출 함수
async function queryOpenAI(queryText) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',  // gpt-3.5-turbo 모델 사용
                messages: [{ role: 'user', content: queryText }],
                max_tokens: 150,          // 응답에서 받을 최대 토큰 수
            },
            {
                headers: {
                    'Authorization': `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`,  // OpenAI API 키를 여기에 입력하세요
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching data from OpenAI API:', error);
        return 'Error processing your request. Please try again later.';
    }
}

// 쿼리 텍스트 생성 및 API 호출
async function processCreditData() {
    const queryText = `Customer payment history: ${creditData.paymentHistory}. Debt ratio: ${creditData.debtRatio}. Length of credit history: ${creditData.creditHistoryLength}. New credit inquiries: ${creditData.newCreditInquiries}. Calculate the customer's creditworthiness.`;

    const result = await queryOpenAI(queryText);

    // 결과를 콘솔에 출력 (HTML과 연결 시 화면에 표시할 수 있음)
    console.log('Creditworthiness Assessment:', result);

    // HTML과 연결할 경우, 결과를 페이지에 표시할 수 있습니다.
    // document.getElementById('result').innerText = result;
}

// 함수 실행
processCreditData();