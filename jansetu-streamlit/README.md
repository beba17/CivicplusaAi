# JanSetu AI — Streamlit

This is the Streamlit deployment version of the JanSetu AI hackathon prototype.

## Run locally

```bash
pip install -r requirements.txt
streamlit run app.py
```

## Deploy to Streamlit Community Cloud

1. Push this `jansetu-streamlit` folder to a GitHub repository.
2. Open Streamlit Community Cloud and choose **New app**.
3. Select the repository and set the main file path to:

   ```text
   jansetu-streamlit/app.py
   ```

4. Deploy.

The current build uses clearly labeled local demo data. Citizen submissions
persist only for the current Streamlit session; connect a database and a real
multilingual AI pipeline before using it with production citizen data.