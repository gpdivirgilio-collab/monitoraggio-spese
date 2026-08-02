# Monitoraggio Spese

App web (PWA) per tenere le spese e il patrimonio, con import degli estratti
conto di Revolut e Trade Republic in CSV o PDF.

**App:** https://gpdivirgilio-collab.github.io/monitoraggio-spese/

I dati restano sul dispositivo (memoria del browser): nessun server, nessun
account, nessun dato in questo repository.

## Collegare il backup automatico su Google Drive

Passaggio da fare una volta sola. Serve a ottenere un «ID client», cioè il
codice con cui Google riconosce l'app come autorizzata dal tuo account.

1. Vai su https://console.cloud.google.com e accedi.
2. In alto, **crea un nuovo progetto** e chiamalo per esempio `Monitoraggio Spese`.
   Aspetta che venga creato e selezionalo.
3. Menù ☰ → **API e servizi** → **Libreria**. Cerca **Google Drive API** e premi
   **Abilita**.
4. Menù ☰ → **API e servizi** → **Schermata consenso OAuth** (nelle versioni
   recenti si chiama *Google Auth Platform*):
   - tipo di utente: **Esterno**
   - nome app: `Monitoraggio Spese`, email di assistenza: la tua
   - poi apri la sezione **Destinatari** (*Audience*) e premi **Pubblica app**.

   > **Questo passaggio è obbligatorio.** Se il progetto resta in stato *Test*,
   > Google risponde `403 access_denied` a chiunque non sia elencato fra gli
   > utenti di test. In alternativa alla pubblicazione puoi restare in Test e
   > aggiungere il tuo indirizzo Gmail in **Utenti di test**.
   > Con il solo permesso `drive.file` la pubblicazione **non richiede**
   > la verifica di Google.
5. Menù ☰ → **API e servizi** → **Credenziali** → **Crea credenziali** →
   **ID client OAuth**:
   - tipo: **Applicazione web**
   - in **Origini JavaScript autorizzate** aggiungi esattamente:
     `https://gpdivirgilio-collab.github.io`
   - premi **Crea** e copia l'**ID client** (finisce con
     `.apps.googleusercontent.com`)
6. Apri l'app → **Altro** → *Backup automatico su Google Drive*: incolla l'ID
   client e premi **Collega e salva ora**. Autorizza con il tuo account Google.

Da quel momento, quando apri l'app ed è passato un mese dall'ultimo backup, il
file viene caricato da solo sul tuo Drive.

L'app chiede il permesso `drive.file`, il più stretto disponibile: **può vedere
soltanto i file che ha creato lei**, non il resto del tuo Drive. Lo script di
Google viene caricato solo se colleghi Drive; se non lo fai, o se premi
**Scollega**, l'app non contatta nessun server esterno.

## Ripristinare i dati su un telefono nuovo

Apri l'app → **Altro** → **Ripristina backup** e scegli il file
`monitoraggio-spese-AAAA-MM-GG.json` (da Drive, email o Download).
