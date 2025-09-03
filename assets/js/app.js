const { createApp } = Vue;
        
createApp({
    data() {
        return {
            source: { title: 'Oracle Q&A Source', questions: [] },
            search: ''
        };
    },
    computed: {
        filteredQuestions() {
            return this.source.questions.filter(q => 
                q.question_text.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    },
    mounted() {
        $.ajax({
            url: 'assets/data/answers.json',
            dataType: 'json',
            success: (data) => {
                this.source = data.source;
            },
             error: (err) => {
                console.error("Failed to load JSON:", err);
            }
        });
    }
}).mount('#app');