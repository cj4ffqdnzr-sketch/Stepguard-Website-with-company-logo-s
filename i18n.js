/* ============================================================================
   i18n.js — Stepguard language selector (NL · EN · DE)
   ----------------------------------------------------------------------------
   - Injects a small globe dropdown into the top nav (all pages).
   - Translates the page in place: every text node + input placeholders + the
     document <title>. Dutch (nl) is the source in the markup; en/de come from
     the dictionary below. Strings not in the dictionary stay as-is.
   - Choice persists in localStorage ('sg_lang') and applies on every page.
   Vanilla JS, no dependencies. Load once per page, before arrange.js.
   ========================================================================== */
(function () {
  if (window.__sgI18nLoaded) return;
  window.__sgI18nLoaded = true;

  var LANGS = { nl: 'Nederlands', en: 'English', de: 'Deutsch' };
  var CODES = { nl: 'NL', en: 'EN', de: 'DE' };

  /* --- Dictionary: [ nl, en, de ] ------------------------------------------ */
  var D = [
    /* nav + common */
    ['Product', 'Product', 'Produkt'],
    ['Over ons', 'About us', 'Über uns'],
    ['Contact', 'Contact', 'Kontakt'],
    ['Demo aanvragen', 'Request a demo', 'Demo anfragen'],

    /* page titles */
    ['Stepguard · Het product', 'Stepguard · The product', 'Stepguard · Das Produkt'],
    ['Stepguard · Over ons', 'Stepguard · About us', 'Stepguard · Über uns'],
    ['Stepguard · Contact', 'Stepguard · Contact', 'Stepguard · Kontakt'],

    /* forms */
    ['Voornaam', 'First name', 'Vorname'],
    ['Operator / bedrijf', 'Operator / company', 'Betreiber / Unternehmen'],
    ['Zakelijk e-mailadres', 'Business email', 'Geschäftliche E-Mail'],
    ['Netwerkgrootte, ca. aantal roltrappen', 'Network size, approx. number of escalators', 'Netzwerkgröße, ca. Anzahl Rolltreppen'],
    ['Uw vraag (optioneel)', 'Your question (optional)', 'Ihre Frage (optional)'],
    ['Bedankt, we nemen contact op', "Thank you, we'll be in touch", 'Danke, wir melden uns'],
    ['Vraag een demo aan', 'Request a demo', 'Demo anfragen'],
    ['Wij reageren in het Nederlands, Engels of Duits, uw keuze.', 'We respond in Dutch, English or German, your choice.', 'Wir antworten auf Niederländisch, Englisch oder Deutsch, Ihre Wahl.'],
    ['Wij reageren in het Nederlands, Engels of Duits. Uw keuze.', 'We respond in Dutch, English or German. Your choice.', 'Wir antworten auf Niederländisch, Englisch oder Deutsch. Ihre Wahl.'],

    /* footer */
    ['Het Stepguard-systeem · sensor · edge-AI · asset-platform', 'The Stepguard system · sensor · edge-AI · asset platform', 'Das Stepguard-System · Sensor · Edge-AI · Asset-Plattform'],
    ['Voorspellend toezicht · sensor · edge-AI · asset-platform', 'Predictive monitoring · sensor · edge-AI · asset platform', 'Vorausschauende Überwachung · Sensor · Edge-AI · Asset-Plattform'],

    /* people / contact common */
    ['Verkoop', 'Sales', 'Vertrieb'],
    ['Planning', 'Planning', 'Planung'],
    ['Techniek', 'Engineering', 'Technik'],
    ['Adres', 'Address', 'Adresse'],
    ['Bedrijf', 'Company', 'Unternehmen'],
    ['Praat met ons', 'Talk to us', 'Sprechen Sie uns an'],
    ['Direct contact', 'Direct contact', 'Direkter Kontakt'],

    /* ===== PRODUCT ===== */
    ['Het product', 'The product', 'Das Produkt'],
    ['Eén verzegelde sensor die', 'One sealed sensor that sees', 'Ein versiegelter Sensor, der'],
    ['elke trede', 'every step', 'jede Stufe'],
    ['ziet, en slijtage meldt vóór de storing.', 'and flags wear before the breakdown.', 'sieht und Verschleiß meldet, bevor die Störung eintritt.'],
    ['Stepguard is een industriële', 'Stepguard is an industrial', 'Stepguard ist eine industrielle'],
    ['Computer-vision sensorbox', 'Computer-vision sensor box', 'Computer-Vision-Sensorbox'],
    ['die onder de roltrap wordt gemonteerd. Hij inspecteert iedere passerende trede, herkent scheuren, randslijtage, plaat-misalignment en losse voorwerpen, en stuurt binnen een seconde een gescoorde melding naar een meertalig asset-platform.', 'that is mounted under the escalator. It inspects every passing step, recognising cracks, edge wear, plate misalignment and loose objects, and within a second sends a scored alert to a multilingual asset platform.', 'die unter der Rolltreppe montiert wird. Sie inspiziert jede vorbeilaufende Stufe, erkennt Risse, Kantenverschleiß, Platten-Fehlstellung und lose Gegenstände und sendet innerhalb einer Sekunde eine bewertete Meldung an eine mehrsprachige Asset-Plattform.'],
    ['Zonder de roltrap zelf aan te passen', 'Without modifying the escalator itself', 'Ohne die Rolltreppe selbst zu verändern'],
    ['en zonder verstoring van het bestaande onderhoudscontract.', 'and without disrupting the existing maintenance contract.', 'und ohne Störung des bestehenden Wartungsvertrags.'],
    ['Boek een demo van 20 min', 'Book a 20-min demo', '20-Min-Demo buchen'],
    ['Bekijk het systeem', 'See the system', 'System ansehen'],

    ['Hoe het werkt', 'How it works', 'So funktioniert es'],
    ['Vier lagen tussen een versleten trede en een gevallen passagier.', 'Four layers between a worn step and a fallen passenger.', 'Vier Schichten zwischen einer verschlissenen Stufe und einem gestürzten Fahrgast.'],
    ['Eén verzegelde sensorunit, onder de roltrap gemonteerd, bekijkt elke trede die boven hem voorbij komt. Van ruwe beelden tot bruikbare melding in minder dan een seconde, zonder wijzigingen aan de roltrap en zonder verstoring van het bestaande onderhoudscontract.', 'One sealed sensor unit, mounted under the escalator, watches every step passing above it. From raw images to actionable alert in less than a second, without modifying the escalator and without disrupting the existing maintenance contract.', 'Eine versiegelte Sensoreinheit, unter der Rolltreppe montiert, beobachtet jede Stufe, die über sie hinwegläuft. Von Rohbildern bis zur verwertbaren Meldung in weniger als einer Sekunde, ohne Eingriff an der Rolltreppe und ohne Störung des bestehenden Wartungsvertrags.'],
    ['01 · Vastleggen', '01 · Capture', '01 · Erfassen'],
    ['Industriële IDS-vision', 'Industrial IDS vision', 'Industrielle IDS-Vision'],
    ["Trillingsbestendige IDS-camera's met low-light prestaties inspecteren elke trede met de snelheid waarmee hij passeert. Verzegelde behuizing onder de roltrap, zonder rail-aanpassingen.", 'Vibration-resistant IDS cameras with low-light performance inspect every step at the speed it passes. Sealed housing under the escalator, without rail modifications.', 'Vibrationsfeste IDS-Kameras mit Low-Light-Leistung inspizieren jede Stufe in der Geschwindigkeit, in der sie vorbeiläuft. Versiegeltes Gehäuse unter der Rolltreppe, ohne Schienenanpassungen.'],
    ['02 · Detecteren', '02 · Detect', '02 · Erkennen'],
    ['AI-vision slijtagemodel', 'AI-vision wear model', 'AI-Vision-Verschleißmodell'],
    ['Getraind op duizenden uren echte Nederlandse en Duitse roltrap-beelden. Herkent scheuren in treden, randslijtage, plaat-misalignment en losse voorwerpen, over merken en stations heen.', 'Trained on thousands of hours of real Dutch and German escalator footage. Recognises step cracks, edge wear, plate misalignment and loose objects, across brands and stations.', 'Trainiert mit tausenden Stunden echtem niederländischem und deutschem Rolltreppen-Bildmaterial. Erkennt Risse in Stufen, Kantenverschleiß, Platten-Fehlstellung und lose Gegenstände, marken- und stationsübergreifend.'],
    ['Patent aangevraagd', 'Patent pending', 'Patent angemeldet'],
    ['On-prem inferentie', 'On-prem inference', 'On-Prem-Inferenz'],
    ['03 · Classificeren', '03 · Classify', '03 · Klassifizieren'],
    ['Alarm in vier niveaus', 'Alarms in four levels', 'Alarm in vier Stufen'],
    ['Iedere gebeurtenis krijgt een score van een routinemelding tot een stop-de-roltrap-noodgeval. Drempels per locatie, per operator en per dienst instelbaar, vals alarm blijft buiten de wachtrij.', 'Every event is scored from a routine notice to a stop-the-escalator emergency. Thresholds adjustable per location, per operator and per shift, false alarms stay out of the queue.', 'Jedes Ereignis erhält eine Bewertung, von der Routinemeldung bis zum Stoppt-die-Rolltreppe-Notfall. Schwellenwerte pro Standort, pro Betreiber und pro Schicht einstellbar, Fehlalarme bleiben aus der Warteschlange.'],
    ['L1-melding → L4-stop', 'L1 notice → L4 stop', 'L1-Meldung → L4-Stopp'],
    ['Operator-afstelbaar', 'Operator-adjustable', 'Betreiber-einstellbar'],
    ['04 · Beslissen', '04 · Decide', '04 · Entscheiden'],
    ['Asset-platform', 'Asset platform', 'Asset-Plattform'],
    ["Een meertalig webplatform toont elke roltrap in uw vloot, met KPI's, monteur-dispatch, exporteerbare EN 115-rapporten en ROI-tracking die uw CFO daadwerkelijk leest.", 'A multilingual web platform shows every escalator in your fleet, with KPIs, technician dispatch, exportable EN 115 reports and ROI tracking your CFO will actually read.', 'Eine mehrsprachige Web-Plattform zeigt jede Rolltreppe Ihrer Flotte, mit KPIs, Techniker-Disposition, exportierbaren EN-115-Berichten und ROI-Tracking, das Ihr CFO tatsächlich liest.'],

    ['Het Stepguard-systeem', 'The Stepguard system', 'Das Stepguard-System'],
    ['Verzegelde hardware. Bewezen montage. Onzichtbaar in dienst.', 'Sealed hardware. Proven mounting. Invisible in service.', 'Versiegelte Hardware. Bewährte Montage. Unsichtbar im Einsatz.'],
    ["Een industriële sensorbox, gekalibreerd in onze werkplaats, onder de roltrap gemonteerd op de servicekant, buiten zicht van passagiers. Hieronder een impressie van de eenheid, montage en bekabeling. Foto's volgen na de eerste veldinstallaties.", "An industrial sensor box, calibrated in our workshop, mounted under the escalator on the service side, out of passengers' sight. Below is an impression of the unit, mounting and cabling. Photos follow after the first field installations.", 'Eine industrielle Sensorbox, in unserer Werkstatt kalibriert, unter der Rolltreppe auf der Serviceseite montiert, außerhalb der Sicht der Fahrgäste. Unten ein Eindruck von Einheit, Montage und Verkabelung. Fotos folgen nach den ersten Feldinstallationen.'],
    ['SG-01 · Sensorbox', 'SG-01 · Sensor box', 'SG-01 · Sensorbox'],
    ['SG-02 · Montage', 'SG-02 · Mounting', 'SG-02 · Montage'],
    ['SG-03 · Optiek', 'SG-03 · Optics', 'SG-03 · Optik'],
    ['SG-04 · Bekabeling', 'SG-04 · Cabling', 'SG-04 · Verkabelung'],
    ['SG-05 · Installatie', 'SG-05 · Installation', 'SG-05 · Installation'],
    ['Hardware', 'Hardware', 'Hardware'],
    ['Verzegelde sensorunit', 'Sealed sensor unit', 'Versiegelte Sensoreinheit'],
    ['IP65, geanodiseerd aluminium, edge-AI module. Werkplaats-gekalibreerd vóór levering.', 'IP65, anodised aluminium, edge-AI module. Workshop-calibrated before delivery.', 'IP65, eloxiertes Aluminium, Edge-AI-Modul. Werkstattkalibriert vor Lieferung.'],
    ['In-situ', 'In situ', 'In situ'],
    ['Onder de tredenketting', 'Under the step chain', 'Unter der Stufenkette'],
    ['Vision', 'Vision', 'Vision'],
    ['Industriële cameramodule', 'Industrial camera module', 'Industrielles Kameramodul'],
    ['Installatie', 'Installation', 'Installation'],
    ['PoE-aansluiting · 1 kabel', 'PoE connection · 1 cable', 'PoE-Anschluss · 1 Kabel'],
    ['Veld', 'Field', 'Feld'],
    ['Montage in < 2 uur', 'Mounting in < 2 hours', 'Montage in < 2 Std.'],

    ['De box', 'The box', 'Die Box'],
    ['Eén verzegelde unit. Afmetingen, materiaal en montage in het kort.', 'One sealed unit. Dimensions, material and mounting in brief.', 'Eine versiegelte Einheit. Abmessungen, Material und Montage in Kürze.'],
    ["De Stepguard-sensorbox wordt in onze werkplaats gekalibreerd en op de servicekant onder de roltrap gemonteerd, buiten zicht van passagiers, zonder rail-aanpassingen. Hieronder de fysieke specificaties; de praktijkfoto's staan in het systeem-overzicht hierboven.", "The Stepguard sensor box is calibrated in our workshop and mounted on the service side under the escalator, out of passengers' sight, without rail modifications. Below are the physical specifications; the in-field photos are in the system overview above.", 'Die Stepguard-Sensorbox wird in unserer Werkstatt kalibriert und auf der Serviceseite unter der Rolltreppe montiert, außerhalb der Sicht der Fahrgäste, ohne Schienenanpassungen. Unten die physischen Spezifikationen; die Praxisfotos finden Sie in der System-Übersicht oben.'],
    ['Afmetingen & gewicht', 'Dimensions & weight', 'Abmessungen & Gewicht'],
    ['Compacte industriële behuizing, geanodiseerd aluminium. Indicatief 240 × 120 × 90 mm, ca. 1,8 kg. Definitieve maatvoering volgt na de eerste veldinstallaties.', 'Compact industrial housing, anodised aluminium. Indicative 240 × 120 × 90 mm, approx. 1.8 kg. Final dimensions follow after the first field installations.', 'Kompaktes Industriegehäuse, eloxiertes Aluminium. Richtwert 240 × 120 × 90 mm, ca. 1,8 kg. Endgültige Maße folgen nach den ersten Feldinstallationen.'],
    ['Bescherming', 'Protection', 'Schutz'],
    ['Verzegelde IP65-behuizing, bestand tegen stof, trillingen en het reinigingsregime van een stationsomgeving. GS-class componenten.', 'Sealed IP65 housing, resistant to dust, vibration and the cleaning regime of a station environment. GS-class components.', 'Versiegeltes IP65-Gehäuse, beständig gegen Staub, Vibration und das Reinigungsregime einer Bahnhofsumgebung. GS-Klasse-Komponenten.'],
    ['Optiek', 'Optics', 'Optik'],
    ['Trillingsbestendige industriële IDS-vision module met low-light prestaties, inspecteert elke trede op de snelheid waarmee hij passeert.', 'Vibration-resistant industrial IDS vision module with low-light performance, inspects every step at the speed it passes.', 'Vibrationsfestes industrielles IDS-Vision-Modul mit Low-Light-Leistung, inspiziert jede Stufe in der Geschwindigkeit, in der sie vorbeiläuft.'],
    ['Aansluiting & montage', 'Connection & mounting', 'Anschluss & Montage'],
    ['Eén PoE-kabel voor voeding én data. Montage door ons team in minder dan twee uur per roltrap, zonder onderbreking van het bestaande onderhoudscontract.', 'One PoE cable for power and data. Mounted by our team in less than two hours per escalator, without interrupting the existing maintenance contract.', 'Ein PoE-Kabel für Strom und Daten. Montage durch unser Team in weniger als zwei Stunden pro Rolltreppe, ohne Unterbrechung des bestehenden Wartungsvertrags.'],
    ['PoE · 1 kabel', 'PoE · 1 cable', 'PoE · 1 Kabel'],
    ['< 2 u', '< 2 h', '< 2 Std.'],

    ['Het softwareplatform', 'The software platform', 'Die Software-Plattform'],
    ['Een controleruimte voor iedere roltrap die u beheert.', 'A control room for every escalator you manage.', 'Ein Kontrollraum für jede Rolltreppe, die Sie verwalten.'],
    ['Elke melding van de box komt samen in een meertalig webplatform, gescoord, doorzoekbaar en exporteerbaar. Van losse trede tot vlootoverzicht, in het Nederlands, Engels of Duits.', 'Every alert from the box comes together in a multilingual web platform, scored, searchable and exportable. From single step to fleet overview, in Dutch, English or German.', 'Jede Meldung der Box läuft in einer mehrsprachigen Web-Plattform zusammen, bewertet, durchsuchbar und exportierbar. Von der einzelnen Stufe bis zur Flottenübersicht, auf Niederländisch, Englisch oder Deutsch.'],
    ['Live vlootdashboard', 'Live fleet dashboard', 'Live-Flotten-Dashboard'],
    ["Elke roltrap in uw netwerk met status, openstaande alarmen en KPI's in één blik, gefilterd op station, lijn of operator.", 'Every escalator in your network with status, open alarms and KPIs at a glance, filtered by station, line or operator.', 'Jede Rolltreppe in Ihrem Netz mit Status, offenen Alarmen und KPIs auf einen Blick, gefiltert nach Station, Linie oder Betreiber.'],
    ['Alarmen in vier niveaus', 'Alarms in four levels', 'Alarme in vier Stufen'],
    ['Van routinemelding tot stop-de-roltrap. Drempels instelbaar per locatie en dienst, met monteur-dispatch en statusverloop.', 'From routine notice to stop-the-escalator. Thresholds adjustable per location and shift, with technician dispatch and status history.', 'Von der Routinemeldung bis zum Stopp-der-Rolltreppe. Schwellenwerte einstellbar pro Standort und Schicht, mit Techniker-Disposition und Statusverlauf.'],
    ['EN 115-rapporten & export', 'EN 115 reports & export', 'EN-115-Berichte & Export'],
    ['Inspectie- en onderhoudshistorie als exporteerbaar rapport, inclusief ROI-tracking die uw CFO daadwerkelijk leest.', 'Inspection and maintenance history as an exportable report, including ROI tracking your CFO will actually read.', 'Inspektions- und Wartungshistorie als exportierbarer Bericht, inklusive ROI-Tracking, das Ihr CFO tatsächlich liest.'],
    ['Drie talen, EU-hosted', 'Three languages, EU-hosted', 'Drei Sprachen, EU-gehostet'],
    ['NL · EN · DE in één klik. Data binnen de EU gehost, conform GDPR, BDSG en de EU AI Act, de mens beslist, niet het model.', 'NL · EN · DE in one click. Data hosted within the EU, compliant with GDPR, BDSG and the EU AI Act, the human decides, not the model.', 'NL · EN · DE mit einem Klick. Daten innerhalb der EU gehostet, konform mit DSGVO, BDSG und dem EU AI Act, der Mensch entscheidet, nicht das Modell.'],
    ['Bekijk het platform live', 'See the platform live', 'Plattform live ansehen'],
    ['Boek een demo', 'Book a demo', 'Demo buchen'],

    ['Specs', 'Specs', 'Specs'],
    ['Specificaties, certificering en patent.', 'Specifications, certification and patent.', 'Spezifikationen, Zertifizierung und Patent.'],
    ['De prestatie- en compliancekaders waarbinnen Stepguard werkt. Volledige technische documentatie en testrapporten delen we onder NDA tijdens een pilottraject.', 'The performance and compliance frameworks within which Stepguard operates. We share full technical documentation and test reports under NDA during a pilot.', 'Die Leistungs- und Compliance-Rahmen, in denen Stepguard arbeitet. Vollständige technische Dokumentation und Testberichte teilen wir unter NDA während eines Pilotprojekts.'],
    ['Snelheid', 'Speed', 'Geschwindigkeit'],
    ['Van ruw beeld tot gescoorde melding in minder dan één seconde, met on-prem edge-inferentie, geen afhankelijkheid van cloud-latentie voor een stop-commando.', 'From raw image to scored alert in less than one second, with on-prem edge inference, no dependence on cloud latency for a stop command.', 'Vom Rohbild zur bewerteten Meldung in weniger als einer Sekunde, mit On-Prem-Edge-Inferenz, ohne Abhängigkeit von Cloud-Latenz für einen Stopp-Befehl.'],
    ['Detectie', 'Detection', 'Erkennung'],
    ['AI-vision slijtagemodel getraind op duizenden uren echte Nederlandse en Duitse roltrap-beelden. Herkent scheuren, randslijtage, plaat-misalignment en losse voorwerpen, over merken heen.', 'AI-vision wear model trained on thousands of hours of real Dutch and German escalator footage. Recognises cracks, edge wear, plate misalignment and loose objects, across brands.', 'AI-Vision-Verschleißmodell, trainiert mit tausenden Stunden echtem niederländischem und deutschem Rolltreppen-Bildmaterial. Erkennt Risse, Kantenverschleiß, Platten-Fehlstellung und lose Gegenstände, markenübergreifend.'],
    ['Cross-brand', 'Cross-brand', 'Markenübergreifend'],
    ['Patent', 'Patent', 'Patent'],
    ['De meet- en detectiemethode achter Stepguard is octrooi-aangevraagd. De sensor is een CE-conforme add-on die de roltrap zelf niet wijzigt.', 'The measurement and detection method behind Stepguard is patent-pending. The sensor is a CE-compliant add-on that does not modify the escalator itself.', 'Die Mess- und Erkennungsmethode hinter Stepguard ist zum Patent angemeldet. Der Sensor ist ein CE-konformes Add-on, das die Rolltreppe selbst nicht verändert.'],
    ['Certificering & compliance', 'Certification & compliance', 'Zertifizierung & Compliance'],
    ['Werkt binnen EN 115 voor roltrappen. Data EU-gehost en verwerkt conform GDPR en BDSG; AI-toepassing conform de EU AI Act, beslissingen blijven bij de mens.', 'Works within EN 115 for escalators. Data EU-hosted and processed in line with GDPR and BDSG; AI use compliant with the EU AI Act, decisions remain with the human.', 'Arbeitet innerhalb von EN 115 für Rolltreppen. Daten EU-gehostet und verarbeitet gemäß DSGVO und BDSG; KI-Einsatz konform mit dem EU AI Act, Entscheidungen bleiben beim Menschen.'],

    /* shared: quote / besparing / over / contact */
    ['Van de eerste partner', 'From our first partner', 'Vom ersten Partner'],
    ['Onderhoud plannen in plaats van brandjes blussen.', 'Planning maintenance instead of fighting fires.', 'Wartung planen statt Brände löschen.'],
    ['Stepguard laat ons onderhoud plannen in plaats van brandjes blussen. We zien slijtage aankomen, dat verandert hoe we onze stations runnen.', 'Stepguard lets us plan maintenance instead of fighting fires. We see wear coming, and that changes how we run our stations.', 'Mit Stepguard können wir Wartung planen, statt Brände zu löschen. Wir sehen Verschleiß kommen, und das verändert, wie wir unsere Bahnhöfe betreiben.'],
    ['Stepguard laat ons onderhoud plannen in plaats van brandjes blussen. We zien slijtage aankomen, en dat verandert hoe we onze stations runnen.', 'Stepguard lets us plan maintenance instead of fighting fires. We see wear coming, and that changes how we run our stations.', 'Mit Stepguard können wir Wartung planen, statt Brände zu löschen. Wir sehen Verschleiß kommen, und das verändert, wie wir unsere Bahnhöfe betreiben.'],
    ['Besparing', 'Savings', 'Einsparung'],
    ['Reken de besparing door op uw eigen cijfers.', 'Calculate the savings on your own numbers.', 'Berechnen Sie die Einsparung mit Ihren eigenen Zahlen.'],
    ['Minder spoedreparaties, minder onverwachte stilstand en treden die langer meegaan. Onze interactieve calculator zet uw vlootgegevens om in een jaarlijkse besparing, schuif de waarden naar uw eigen situatie.', 'Fewer emergency repairs, less unexpected downtime and steps that last longer. Our interactive calculator turns your fleet data into an annual saving, slide the values to your own situation.', 'Weniger Notreparaturen, weniger unerwarteter Stillstand und Stufen, die länger halten. Unser interaktiver Rechner verwandelt Ihre Flottendaten in eine jährliche Einsparung, schieben Sie die Werte auf Ihre eigene Situation.'],
    ['Minder spoedreparaties, minder onverwachte stilstand en treden die langer meegaan. Onze interactieve calculator zet uw vlootgegevens om in een jaarlijkse besparing. Schuif de waarden naar uw eigen situatie.', 'Fewer emergency repairs, less unexpected downtime and steps that last longer. Our interactive calculator turns your fleet data into an annual saving. Slide the values to your own situation.', 'Weniger Notreparaturen, weniger unerwarteter Stillstand und Stufen, die länger halten. Unser interaktiver Rechner verwandelt Ihre Flottendaten in eine jährliche Einsparung. Schieben Sie die Werte auf Ihre eigene Situation.'],
    ['Open de besparingscalculator', 'Open the savings calculator', 'Einsparrechner öffnen'],
    ['tot 70%', 'up to 70%', 'bis zu 70%'],
    ['Minder uitval', 'Less downtime', 'Weniger Ausfall'],
    ['Ongeplande trede-vervanging', 'Unplanned step replacement', 'Ungeplanter Stufentausch'],
    ['Vermeden spoedreparatie', 'Emergency repair avoided', 'Vermiedene Notreparatur'],
    ['CO₂ per bespaarde trede', 'CO₂ per step saved', 'CO₂ pro eingesparter Stufe'],

    ['Over Stepguard', 'About Stepguard', 'Über Stepguard'],
    ['Een Nederlandse Cboost-spin-off die roltrappen veiliger maakt.', 'A Dutch Cboost spin-off making escalators safer.', 'Ein niederländischer Cboost-Spin-off, der Rolltreppen sicherer macht.'],
    ['Stepguard ontstond uit Cboost en VDB met één doel: storingen voorkomen vóórdat ze gebeuren. We bouwen voorspellend toezicht voor Europese infrastructuur, gebouwd in Nederland, uitgerold in heel Europa.', 'Stepguard emerged from Cboost and VDB with one goal: preventing failures before they happen. We build predictive monitoring for European infrastructure, built in the Netherlands, rolled out across Europe.', 'Stepguard entstand aus Cboost und VDB mit einem Ziel: Störungen verhindern, bevor sie passieren. Wir entwickeln vorausschauende Überwachung für europäische Infrastruktur, entwickelt in den Niederlanden, ausgerollt in ganz Europa.'],
    ['Lees ons verhaal', 'Read our story', 'Unsere Geschichte lesen'],
    ['Opgericht · Cboost spin-off', 'Founded · Cboost spin-off', 'Gegründet · Cboost-Spin-off'],
    ['50 jr', '50 yrs', '50 J.'],
    ['Ervaring uit VDB & Cboost', 'Experience from VDB & Cboost', 'Erfahrung aus VDB & Cboost'],
    ['Lancering met NS Stations', 'Launch with NS Stations', 'Start mit NS Stations'],
    ['Data-hosting & AI Act', 'Data hosting & AI Act', 'Daten-Hosting & AI Act'],

    ['Boek een demo van 20 minuten.', 'Book a 20-minute demo.', 'Buchen Sie eine 20-Minuten-Demo.'],
    ['Wilt u weten wat Stepguard voor uw roltrappen kan betekenen? Stuur direct een bericht naar de juiste persoon, of vul het formulier in, we reageren binnen twee werkdagen, in het Nederlands, Engels of Duits.', 'Want to know what Stepguard can do for your escalators? Message the right person directly, or fill in the form, we respond within two business days, in Dutch, English or German.', 'Möchten Sie wissen, was Stepguard für Ihre Rolltreppen leisten kann? Schreiben Sie direkt der richtigen Person, oder füllen Sie das Formular aus, wir antworten innerhalb von zwei Werktagen, auf Niederländisch, Englisch oder Deutsch.'],

    /* ===== OVER ONS ===== */
    ['Voorspellend toezicht,', 'Predictive monitoring,', 'Vorausschauende Überwachung,'],
    ['gebouwd in Nederland', 'built in the Netherlands', 'entwickelt in den Niederlanden'],
    ['Stepguard is een', 'Stepguard is a', 'Stepguard ist ein'],
    ['Cboost-spin-off', 'Cboost spin-off', 'Cboost-Spin-off'],
    ['met één missie: roltrap-storingen voorkomen vóórdat ze gebeuren. We combineren industriële AI-vision met een meertalig asset-platform, zodat operators van reactief onderhoud naar planbare zekerheid gaan.', 'with one mission: preventing escalator failures before they happen. We combine industrial AI vision with a multilingual asset platform, so operators move from reactive maintenance to plannable certainty.', 'mit einer Mission: Rolltreppen-Störungen verhindern, bevor sie passieren. Wir kombinieren industrielle AI-Vision mit einer mehrsprachigen Asset-Plattform, sodass Betreiber von reaktiver Wartung zu planbarer Sicherheit gelangen.'],
    ['Neem contact op', 'Get in touch', 'Kontakt aufnehmen'],
    ['Bekijk het product', 'See the product', 'Produkt ansehen'],

    ['Missie & visie', 'Mission & vision', 'Mission & Vision'],
    ['Geen passagier zou stil mogen vallen op een versleten trede.', 'No passenger should be stranded on a worn step.', 'Kein Fahrgast sollte auf einer verschlissenen Stufe stranden.'],
    ['Elke dag vallen roltrappen uit op het slechtst denkbare moment. De rekening voor spoedreparatie, stilstand en veiligheidsrisico komt achteraf. Onze missie is om dat om te draaien: slijtage weken vooraf zichtbaar, onderhoud gepland, treden langer mee. Onze visie reikt verder dan de roltrap: voorspellend toezicht als standaard voor alle Europese publieke infrastructuur, gebouwd in Nederland.', 'Every day escalators fail at the worst possible moment. The bill for emergency repair, downtime and safety risk arrives afterwards. Our mission is to turn that around: wear visible weeks in advance, maintenance planned, steps lasting longer. Our vision reaches beyond the escalator: predictive monitoring as the standard for all European public infrastructure, built in the Netherlands.', 'Jeden Tag fallen Rolltreppen im denkbar schlechtesten Moment aus. Die Rechnung für Notreparatur, Stillstand und Sicherheitsrisiko kommt im Nachhinein. Unsere Mission ist es, das umzukehren: Verschleiß Wochen im Voraus sichtbar, Wartung geplant, Stufen halten länger. Unsere Vision reicht über die Rolltreppe hinaus: vorausschauende Überwachung als Standard für die gesamte europäische öffentliche Infrastruktur, entwickelt in den Niederlanden.'],
    ['Voorkomen', 'Prevent', 'Verhindern'],
    ['Detecteer slijtage en schade weken voordat een trede faalt.', 'Detect wear and damage weeks before a step fails.', 'Erkennen Sie Verschleiß und Schäden Wochen, bevor eine Stufe versagt.'],
    ['Plannen', 'Plan', 'Planen'],
    ['Van noodoproep naar geplande dagdienst-ingreep, zonder verrassingen.', 'From emergency call to planned day-shift intervention, without surprises.', 'Vom Notruf zum geplanten Tagschicht-Eingriff, ohne Überraschungen.'],
    ['Verlengen', 'Extend', 'Verlängern'],
    ['Langere levensduur van treden, minder materiaal, minder CO₂.', 'Longer step lifespan, less material, less CO₂.', 'Längere Lebensdauer der Stufen, weniger Material, weniger CO₂.'],
    ['Vertrouwen', 'Trust', 'Vertrauen'],
    ['AI suggereert, de mens beslist, conform de EU AI Act.', 'AI suggests, the human decides, in line with the EU AI Act.', 'Die KI schlägt vor, der Mensch entscheidet, konform mit dem EU AI Act.'],

    ['Wie is Stepguard', 'Who is Stepguard', 'Wer ist Stepguard'],
    ['Ontstaan uit vijftig jaar techniek, gelanceerd met NS.', 'Born from fifty years of engineering, launched with NS.', 'Entstanden aus fünfzig Jahren Technik, gestartet mit NS.'],
    ['Stepguard is geen start van nul. We bouwen voort op decennia hands-on ervaring met aandrijving, mechatronica en industriële vision, samengebracht in één voorspellend platform voor roltrappen.', 'Stepguard is not a start from scratch. We build on decades of hands-on experience in drive technology, mechatronics and industrial vision, brought together in a single predictive platform for escalators.', 'Stepguard ist kein Start bei null. Wir bauen auf jahrzehntelanger praktischer Erfahrung in Antriebstechnik, Mechatronik und industrieller Vision auf, vereint in einer einzigen vorausschauenden Plattform für Rolltreppen.'],
    ['01 · Herkomst', '01 · Origin', '01 · Herkunft'],
    ['Uit VDB & Cboost', 'From VDB & Cboost', 'Aus VDB & Cboost'],
    ['Een spin-off geboren uit twee Nederlandse techniekbedrijven: VDB en Cboost. Hun engineering-DNA zit in elke regel van het product.', 'A spin-off born from two Dutch engineering companies: VDB and Cboost. Their engineering DNA is in every line of the product.', 'Ein Spin-off, geboren aus zwei niederländischen Technikunternehmen: VDB und Cboost. Ihre Engineering-DNA steckt in jeder Zeile des Produkts.'],
    ['02 · Ervaring', '02 · Experience', '02 · Erfahrung'],
    ['50 jaar in de praktijk', '50 years in practice', '50 Jahre in der Praxis'],
    ['Een halve eeuw gecombineerde ervaring in aandrijving, onderhoud en industriële systemen: niet de aanname van wat slijtage is, maar de kennis ervan.', 'Half a century of combined experience in drive technology, maintenance and industrial systems: not the assumption of what wear is, but the knowledge of it.', 'Ein halbes Jahrhundert kombinierte Erfahrung in Antriebstechnik, Wartung und Industriesystemen: nicht die Annahme, was Verschleiß ist, sondern das Wissen darüber.'],
    ['03 · Technologie', '03 · Technology', '03 · Technologie'],
    ['Frontline AI-vision', 'Frontline AI vision', 'Frontline-AI-Vision'],
    ['We brengen frontline innovatieve technologie naar een sector die nog grotendeels reactief werkt: edge-AI die elke trede ziet voordat hij faalt.', 'We bring frontline innovative technology to a sector that still works largely reactively: edge AI that sees every step before it fails.', 'Wir bringen innovative Frontline-Technologie in eine Branche, die noch weitgehend reaktiv arbeitet: Edge-AI, die jede Stufe sieht, bevor sie versagt.'],
    ['04 · Lancering', '04 · Launch', '04 · Start'],
    ['Gelanceerd met NS', 'Launched with NS', 'Gestartet mit NS'],
    ['Onze eerste uitrol loopt samen met NS Stations, getraind en gevalideerd op echte Nederlandse perrons en stationsroltrappen.', 'Our first rollout runs together with NS Stations, trained and validated on real Dutch platforms and station escalators.', 'Unser erster Rollout läuft gemeinsam mit NS Stations, trainiert und validiert an echten niederländischen Bahnsteigen und Bahnhofs-Rolltreppen.'],

    ['Het team', 'The team', 'Das Team'],
    ['Mensen die u rechtstreeks spreekt.', 'People you speak to directly.', 'Menschen, mit denen Sie direkt sprechen.'],
    ['Eerste aanspreekpunt voor operators en pilots.', 'First point of contact for operators and pilots.', 'Erster Ansprechpartner für Betreiber und Pilotprojekte.'],
    ['Installatie-inschatting en uitrol over uw netwerk.', 'Installation assessment and rollout across your network.', 'Installationseinschätzung und Rollout über Ihr Netz.'],
    ['Sensor, edge-AI en integratie met uw systemen.', 'Sensor, edge AI and integration with your systems.', 'Sensor, Edge-AI und Integration mit Ihren Systemen.'],

    ['In het kort', 'In brief', 'Kurz gefasst'],
    ['Cboost spin-off', 'Cboost spin-off', 'Cboost-Spin-off'],
    ['Gevestigd in NL', 'Based in NL', 'Ansässig in NL'],
    ['Pilots bij de NS', 'Pilots with NS', 'Pilotprojekte bei NS'],

    ['Waarom Stepguard', 'Why Stepguard', 'Warum Stepguard'],
    ['Vier redenen om van reactief naar voorspellend te gaan.', 'Four reasons to move from reactive to predictive.', 'Vier Gründe, von reaktiv zu vorausschauend zu wechseln.'],
    ['Kostenbesparing', 'Cost saving', 'Kosteneinsparung'],
    ['Plan onderhoud vooraf en vermijd spoedreparaties tot €80.000. Reken uw eigen besparing door.', 'Plan maintenance ahead and avoid emergency repairs up to €80,000. Calculate your own saving.', 'Planen Sie Wartung im Voraus und vermeiden Sie Notreparaturen bis zu 80.000 €. Berechnen Sie Ihre eigene Einsparung.'],
    ['Naar de besparing →', 'To the savings →', 'Zur Einsparung →'],
    ['Veiligheid', 'Safety', 'Sicherheit'],
    ['Zie slijtage weken voordat een trede faalt. Bescherm passagiers die het meest afhankelijk zijn.', 'See wear weeks before a step fails. Protect the passengers who depend on it most.', 'Sehen Sie Verschleiß Wochen, bevor eine Stufe versagt. Schützen Sie die Fahrgäste, die am meisten darauf angewiesen sind.'],
    ['Naar duurzaamheid →', 'To sustainability →', 'Zur Nachhaltigkeit →'],
    ['Beschikbaarheid', 'Availability', 'Verfügbarkeit'],
    ['Geen onverwachte stilstand. Verander noodoproepen in geplande dagdienst-ingrepen.', 'No unexpected downtime. Turn emergency calls into planned day-shift interventions.', 'Kein unerwarteter Stillstand. Verwandeln Sie Notrufe in geplante Tagschicht-Eingriffe.'],
    ['Lifecycle-verlenging', 'Lifecycle extension', 'Lebensdauer-Verlängerung'],
    ['Verleng de levensduur van treden, verminder afval en CO₂: 222 kg per niet-vervangen trede.', 'Extend the lifespan of steps, reduce waste and CO₂: 222 kg per step not replaced.', 'Verlängern Sie die Lebensdauer der Stufen, reduzieren Sie Abfall und CO₂: 222 kg pro nicht ersetzter Stufe.'],

    ['Klaar om te zien wat uw roltrappen u vertellen?', 'Ready to see what your escalators are telling you?', 'Bereit zu sehen, was Ihnen Ihre Rolltreppen sagen?'],

    ['Over het product', 'About the product', 'Über das Produkt'],
    ['Hoe Stepguard werkt: van sensor tot platform.', 'How Stepguard works: from sensor to platform.', 'Wie Stepguard funktioniert: vom Sensor zur Plattform.'],
    ['Eén verzegelde AI-vision sensorbox onder de roltrap, gekoppeld aan een meertalig asset-platform. Hij inspecteert elke trede, scoort de melding en stuurt die binnen een seconde door, zonder de roltrap zelf aan te passen.', 'One sealed AI-vision sensor box under the escalator, linked to a multilingual asset platform. It inspects every step, scores the alert and forwards it within a second, without modifying the escalator itself.', 'Eine versiegelte AI-Vision-Sensorbox unter der Rolltreppe, gekoppelt an eine mehrsprachige Asset-Plattform. Sie inspiziert jede Stufe, bewertet die Meldung und leitet sie innerhalb einer Sekunde weiter, ohne die Rolltreppe selbst zu verändern.'],
    ['Van beeld tot melding', 'From image to alert', 'Vom Bild zur Meldung'],
    ['Montage per roltrap', 'Mounting per escalator', 'Montage pro Rolltreppe'],
    ['Alarmniveaus', 'Alarm levels', 'Alarmstufen'],

    ['Laten we kennismaken.', "Let's get acquainted.", 'Lernen wir uns kennen.'],
    ['Plan een korte demo of een installatie-inschatting. Stuur direct een bericht naar de juiste persoon, of vul het formulier in. We reageren binnen twee werkdagen, in het Nederlands, Engels of Duits.', 'Schedule a short demo or an installation assessment. Message the right person directly, or fill in the form. We respond within two business days, in Dutch, English or German.', 'Planen Sie eine kurze Demo oder eine Installationseinschätzung. Schreiben Sie direkt der richtigen Person, oder füllen Sie das Formular aus. Wir antworten innerhalb von zwei Werktagen, auf Niederländisch, Englisch oder Deutsch.'],

    /* ===== CONTACT ===== */
    ['Praat met de', 'Speak to the', 'Sprechen Sie mit der'],
    ['juiste persoon', 'right person', 'richtigen Person'],
    ['Wilt u weten wat Stepguard voor uw roltrappen kan betekenen? Mail rechtstreeks of vul het formulier in, we reageren binnen twee werkdagen, in het Nederlands, Engels of Duits.', 'Want to know what Stepguard can do for your escalators? Email directly or fill in the form, we respond within two business days, in Dutch, English or German.', 'Möchten Sie wissen, was Stepguard für Ihre Rolltreppen leisten kann? Schreiben Sie direkt eine E-Mail oder füllen Sie das Formular aus, wir antworten innerhalb von zwei Werktagen, auf Niederländisch, Englisch oder Deutsch.']
  ];

  /* --- Build lookup maps --------------------------------------------------- */
  function norm(s) {
    return s.replace(/\u00ad/g, '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  }
  var MAP = { en: {}, de: {} };
  for (var i = 0; i < D.length; i++) {
    var k = norm(D[i][0]);
    if (MAP.en[k] === undefined) MAP.en[k] = D[i][1];
    if (MAP.de[k] === undefined) MAP.de[k] = D[i][2];
  }

  /* --- State --------------------------------------------------------------- */
  var lang = 'nl';
  try { lang = localStorage.getItem('sg_lang') || 'nl'; } catch (_) {}
  if (!LANGS[lang]) lang = 'nl';

  var textNodes = [];   // { node, orig }
  var attrNodes = [];   // { el, orig }
  var titleOrig = document.title;

  function captureTextNodes() {
    var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEMPLATE: 1, svg: 1, SVG: 1, CODE: 1, TEXTAREA: 1 };
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !norm(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        while (p && p !== document.body) {
          if (p.id === 'sg-lang' || (p.tagName && SKIP[p.tagName]) ||
              (p.getAttribute && p.getAttribute('data-no-i18n') !== null)) return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) textNodes.push({ node: n, orig: n.nodeValue });
  }

  function captureAttrs() {
    var els = document.querySelectorAll('input[placeholder]');
    for (var i = 0; i < els.length; i++) attrNodes.push({ el: els[i], orig: els[i].getAttribute('placeholder') });
    var tas = document.querySelectorAll('textarea[placeholder]');
    for (var j = 0; j < tas.length; j++) attrNodes.push({ el: tas[j], orig: tas[j].getAttribute('placeholder') });
  }

  function apply(L) {
    lang = L;
    var dict = MAP[L];
    // text nodes
    for (var i = 0; i < textNodes.length; i++) {
      var e = textNodes[i], o = e.orig;
      if (L === 'nl' || !dict) { e.node.nodeValue = o; continue; }
      var lead = (o.match(/^\s*/) || [''])[0];
      var trail = (o.match(/\s*$/) || [''])[0];
      var core = o.slice(lead.length, o.length - trail.length);
      var t = dict[norm(core)];
      e.node.nodeValue = (t !== undefined) ? (lead + t + trail) : o;
    }
    // placeholders
    for (var j = 0; j < attrNodes.length; j++) {
      var a = attrNodes[j];
      if (L === 'nl' || !dict) { a.el.setAttribute('placeholder', a.orig); continue; }
      var pt = dict[norm(a.orig)];
      a.el.setAttribute('placeholder', pt !== undefined ? pt : a.orig);
    }
    // title + html lang
    if (L === 'nl' || !dict) document.title = titleOrig;
    else { var tt = dict[norm(titleOrig)]; document.title = tt !== undefined ? tt : titleOrig; }
    document.documentElement.lang = L;
    // dropdown UI
    var codeEl = document.querySelector('#sg-lang .sg-lang-code');
    if (codeEl) codeEl.textContent = CODES[L];
    var items = document.querySelectorAll('#sg-lang [data-lang]');
    for (var m = 0; m < items.length; m++)
      items[m].setAttribute('aria-selected', items[m].getAttribute('data-lang') === L ? 'true' : 'false');
    try { localStorage.setItem('sg_lang', L); } catch (_) {}
  }

  // exposed for inline form handlers (confirmation text)
  window.SGI18N = {
    t: function (nlStr) {
      if (lang === 'nl') return nlStr;
      var v = MAP[lang][norm(nlStr)];
      return v !== undefined ? v : nlStr;
    },
    get lang() { return lang; }
  };

  /* --- Globe dropdown ------------------------------------------------------ */
  function injectStyles() {
    var css =
      '#sg-lang{position:relative;font-family:var(--display),system-ui;flex:0 0 auto}' +
      '#sg-lang .sg-lang-btn{display:inline-flex;align-items:center;gap:7px;height:34px;padding:0 10px;border:1px solid var(--line-strong);border-radius:9px;background:transparent;color:var(--steel);font:inherit;font-size:13px;font-weight:600;letter-spacing:.02em;cursor:pointer;transition:border-color .15s,color .15s}' +
      '#sg-lang .sg-lang-btn:hover{border-color:var(--accent);color:var(--accent-2)}' +
      '#sg-lang .sg-lang-btn svg{width:15px;height:15px;flex:0 0 auto}' +
      '#sg-lang .sg-chev{transition:transform .18s}' +
      '#sg-lang.open .sg-chev{transform:rotate(180deg)}' +
      '#sg-lang .sg-lang-menu{position:absolute;top:calc(100% + 8px);right:0;min-width:168px;margin:0;padding:6px;list-style:none;background:var(--surface);border:1px solid var(--line-strong);border-radius:12px;box-shadow:0 16px 40px rgba(0,0,0,.4);opacity:0;transform:translateY(-6px);pointer-events:none;transition:opacity .15s,transform .15s;z-index:60}' +
      '#sg-lang.open .sg-lang-menu{opacity:1;transform:translateY(0);pointer-events:auto}' +
      '#sg-lang .sg-lang-menu li{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;color:var(--text);font-size:14px;font-weight:500;cursor:pointer;transition:background .12s,color .12s}' +
      '#sg-lang .sg-lang-menu li:hover{background:var(--surface-2);color:var(--accent-2)}' +
      '#sg-lang .sg-lang-menu li .c{font-family:var(--mono),monospace;font-size:11px;font-weight:600;letter-spacing:.1em;color:var(--muted);width:22px}' +
      '#sg-lang .sg-lang-menu li[aria-selected="true"]{color:var(--accent-2)}' +
      '#sg-lang .sg-lang-menu li[aria-selected="true"] .c{color:var(--accent-2)}' +
      '#sg-lang .sg-lang-menu li[aria-selected="true"]::after{content:"";margin-left:auto;width:6px;height:6px;border-radius:50%;background:var(--accent)}';
    var s = document.createElement('style');
    s.id = 'sg-lang-style';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function buildDropdown() {
    var globe = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>';
    var chev = '<svg class="sg-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';
    var wrap = document.createElement('div');
    wrap.id = 'sg-lang';
    wrap.setAttribute('data-no-i18n', '');
    var li = '';
    ['nl', 'en', 'de'].forEach(function (code) {
      li += '<li role="option" data-lang="' + code + '"><span class="c">' + CODES[code] + '</span>' + LANGS[code] + '</li>';
    });
    wrap.innerHTML =
      '<button class="sg-lang-btn" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="Taal / Language">' +
        globe + '<span class="sg-lang-code">' + CODES[lang] + '</span>' + chev +
      '</button>' +
      '<ul class="sg-lang-menu" role="listbox">' + li + '</ul>';

    var nav = document.querySelector('.nav-inner');
    if (!nav) return;
    var demoBtn = nav.querySelector('.btn-primary');
    if (demoBtn) nav.insertBefore(wrap, demoBtn);
    else nav.appendChild(wrap);

    var btn = wrap.querySelector('.sg-lang-btn');
    btn.addEventListener('click', function (ev) {
      ev.stopPropagation();
      var open = wrap.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    wrap.querySelectorAll('[data-lang]').forEach(function (item) {
      item.addEventListener('click', function (ev) {
        ev.stopPropagation();
        apply(item.getAttribute('data-lang'));
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', function () {
      wrap.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  function init() {
    captureTextNodes();
    captureAttrs();
    injectStyles();
    buildDropdown();
    apply(lang);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
