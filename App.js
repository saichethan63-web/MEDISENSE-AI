import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Linking, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

const COLORS = {
  primary: '#5B21B6',
  primaryDark: '#3B0764',
  surface: '#FFFFFF',
  background: '#F7F5FA',
  text: '#17121F',
  muted: '#756D80',
  border: '#E8E2EF',
  danger: '#DC2626',
  success: '#15803D',
  warning: '#B45309',
};

const HOSPITALS = [
  ['Apollo Hospitals', 'Greams Road', '044-28293333'],
  ['MIOT International', 'Manapakkam', '044-42002288'],
  ['Fortis Malar', 'Adyar', '044-42892222'],
  ['Kauvery Hospital', 'Alwarpet', '044-40006000'],
  ['Dr. Kamakshi Memorial', 'Pallikaranai', '044-43003000'],
  ['Government General Hospital', 'Park Town', '044-25305000'],
  ['Stanley Medical College', 'Park Town', '044-25281347'],
  ['Vijaya Hospital', 'Vadapalani', '044-24881300'],
  ['Chettinad Health City', 'Kelambakkam', '044-47411000'],
  ['SRM Medical Institute', 'Kattankulathur', '044-47432000'],
];

const STORAGE_KEY = 'medi-sense-user-v2';

function getStoredUser() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  try { return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; }
}

function saveUser(user) {
  if (Platform.OS === 'web' && typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function Button({ title, onPress, variant = 'primary', disabled = false }) {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, variant === 'danger' && styles.dangerButton, variant === 'secondary' && styles.secondaryButton, disabled && styles.disabledButton, pressed && styles.pressed]}>
      <Text style={[styles.buttonText, variant !== 'primary' && styles.darkButtonText]}>{title}</Text>
    </Pressable>
  );
}

function Field({ label, value, onChangeText, placeholder, secureTextEntry = false }) {
  return <View style={styles.fieldWrap}><Text style={styles.label}>{label}</Text><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#A59DAE" secureTextEntry={secureTextEntry} style={styles.input} /></View>;
}

function Splash({ onLogin, onSignup }) {
  return <View style={styles.centerPage}>
    <View style={styles.logo}><Text style={styles.logoText}>M</Text></View>
    <Text style={styles.kicker}>SDG 3 · GOOD HEALTH & WELL-BEING</Text>
    <Text style={styles.heroTitle}>Medi-Sense AI</Text>
    <Text style={styles.heroSub}>Emergency triage and patient-aware AI guidance, built for fast decisions when they matter.</Text>
    <View style={styles.card}><Text style={styles.cardTitle}>Your safety, one screen away</Text><Text style={styles.muted}>Get symptom guidance, emergency contacts, hospital information and a personal health profile.</Text></View>
    <Button title="Log in" onPress={onLogin} /><Button title="Create account" onPress={onSignup} variant="secondary" />
  </View>;
}

function Login({ onBack, onSuccess }) {
  const [phone, setPhone] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('');
  const submit = () => { if (!/^\d{10}$/.test(phone.replace(/\D/g, '')) || password.length < 4) return setError('Enter a valid 10-digit phone number and a password of at least 4 characters.'); onSuccess({ name: 'Patient', phone, conditions: [], allergies: [], medications: [], guardian: '' }); };
  return <ScrollView contentContainerStyle={styles.formPage}><Text style={styles.kicker}>WELCOME BACK</Text><Text style={styles.pageTitle}>Log in</Text><Text style={styles.muted}>Access your emergency profile and triage history.</Text><Field label="Phone number" value={phone} onChangeText={setPhone} placeholder="10-digit mobile number" /><Field label="Password" value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />{error ? <Text style={styles.error}>{error}</Text> : null}<Button title="Continue" onPress={submit} /><Button title="Back" onPress={onBack} variant="secondary" /></ScrollView>;
}

function Signup({ onBack, onSuccess }) {
  const [name, setName] = useState(''); const [phone, setPhone] = useState(''); const [password, setPassword] = useState(''); const [guardian, setGuardian] = useState(''); const [error, setError] = useState('');
  const submit = () => { if (!name.trim() || !/^\d{10}$/.test(phone.replace(/\D/g, '')) || password.length < 4) return setError('Please complete your name, valid 10-digit phone number and password.'); onSuccess({ name: name.trim(), phone, conditions: [], allergies: [], medications: [], guardian }); };
  return <ScrollView contentContainerStyle={styles.formPage}><Text style={styles.kicker}>NEW PATIENT</Text><Text style={styles.pageTitle}>Create your profile</Text><Field label="Full name" value={name} onChangeText={setName} placeholder="Your name" /><Field label="Phone number" value={phone} onChangeText={setPhone} placeholder="10-digit mobile number" /><Field label="Password" value={password} onChangeText={setPassword} placeholder="Create a password" secureTextEntry /><Field label="Guardian phone (optional)" value={guardian} onChangeText={setGuardian} placeholder="Emergency contact" />{error ? <Text style={styles.error}>{error}</Text> : null}<Button title="Create profile" onPress={submit} /><Button title="Back" onPress={onBack} variant="secondary" /></ScrollView>;
}

function Emergency() {
  const call = number => Linking.openURL(`tel:${number.replace(/\D/g, '')}`);
  const sos = () => call('108');
  return <ScrollView contentContainerStyle={styles.page}><View style={styles.header}><View><Text style={styles.kicker}>EMERGENCY CENTER</Text><Text style={styles.sectionTitle}>Need help now?</Text></View><View style={styles.status}><View style={styles.dot} /><Text style={styles.statusText}>READY</Text></View></View>
    <View style={styles.sosCard}><Text style={styles.sosEyebrow}>LIFE-THREATENING?</Text><Text style={styles.sosTitle}>Call emergency services immediately.</Text><Text style={styles.sosSub}>Use SOS for ambulance assistance. Do not wait for AI guidance during a life-threatening emergency.</Text><Pressable onPress={sos} style={({ pressed }) => [styles.sosButton, pressed && styles.pressed]}><Text style={styles.sosButtonText}>🚨  CALL 108</Text></Pressable></View>
    <Text style={styles.sectionTitle}>Quick dial</Text><View style={styles.quickGrid}>{[['108','Ambulance'],['100','Police'],['101','Fire']].map(([n,l]) => <Pressable key={n} onPress={() => call(n)} style={styles.quickCard}><Text style={styles.quickNumber}>{n}</Text><Text style={styles.muted}>{l}</Text></Pressable>)}</View>
    <Text style={styles.sectionTitle}>Chennai emergency hospitals</Text>{HOSPITALS.slice(0,5).map(([name,area,phone]) => <View key={name} style={styles.hospital}><View style={{flex:1}}><Text style={styles.hospitalName}>{name}</Text><Text style={styles.muted}>{area} · {phone}</Text></View><Pressable onPress={() => call(phone)}><Text style={styles.callLink}>CALL</Text></Pressable></View>)}
  </ScrollView>;
}

function Chat() {
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'I can help you think through symptoms and urgency. Describe what you are experiencing, including when it started and how severe it is.' }]);
  const [input, setInput] = useState(''); const [busy, setBusy] = useState(false);
  const send = async () => { const text = input.trim(); if (!text || busy) return; setInput(''); setMessages(m => [...m, {role:'user', text}]); setBusy(true);
    const key = typeof process !== 'undefined' && process.env ? process.env.EXPO_PUBLIC_CLAUDE_API_KEY : '';
    if (!key || key.includes('your_')) { setTimeout(() => { setMessages(m => [...m, {role:'assistant', text:'AI service is not configured for this web deployment. For immediate danger, call 108. For non-emergency symptoms, contact a qualified healthcare professional.'}]); setBusy(false); }, 400); return; }
    try { const r = await fetch('https://api.anthropic.com/v1/messages', {method:'POST', headers:{'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'}, body:JSON.stringify({model:'claude-3-5-haiku-latest',max_tokens:500,system:'You are a cautious health triage assistant. Do not diagnose. Identify emergency warning signs, recommend appropriate urgency, and encourage professional care. If life-threatening symptoms are possible, tell the user to call local emergency services.',messages:[...messages.filter(x=>x.role!=='system'),{role:'user',content:text}].map(x=>({role:x.role,content:x.text}))})}); const data=await r.json(); const answer=data?.content?.map(x=>x.text).join(' ') || 'I could not produce a response. Please contact a healthcare professional.'; setMessages(m=>[...m,{role:'assistant',text:answer}]); } catch { setMessages(m=>[...m,{role:'assistant',text:'The AI service is temporarily unavailable. If symptoms are severe or worsening, seek medical care immediately.'}]); } finally { setBusy(false); }
  };
  return <View style={styles.chatPage}><View><Text style={styles.kicker}>MEDI-SENSE AI</Text><Text style={styles.sectionTitle}>AI Triage</Text><Text style={styles.muted}>Guidance only — not a diagnosis.</Text></View><ScrollView style={styles.messages}>{messages.map((m,i)=><View key={i} style={[styles.message,m.role==='user'?styles.userMessage:styles.aiMessage]}><Text style={styles.messageText}>{m.text}</Text></View>)}{busy&&<View style={styles.aiMessage}><ActivityIndicator color={COLORS.primary}/></View>}</ScrollView><View style={styles.chatBar}><TextInput value={input} onChangeText={setInput} placeholder="Describe your symptoms..." placeholderTextColor="#9B94A2" multiline style={styles.chatInput}/><Pressable onPress={send} style={styles.send}><Text style={styles.sendText}>↑</Text></Pressable></View></View>;
}

function Profile({ user, onUpdate, onLogout }) {
  const [conditions,setConditions]=useState(user.conditions||[]); const [allergies,setAllergies]=useState(user.allergies||[]); const [medications,setMedications]=useState(user.medications||[]); const [guardian,setGuardian]=useState(user.guardian||'');
  const save=()=>onUpdate({...user,conditions,allergies,medications,guardian});
  return <ScrollView contentContainerStyle={styles.page}><Text style={styles.kicker}>PATIENT PROFILE</Text><Text style={styles.sectionTitle}>{user.name}</Text><Text style={styles.muted}>{user.phone}</Text><View style={styles.profileCard}><Text style={styles.cardTitle}>Medical information</Text><Field label="Conditions" value={conditions.join(', ')} onChangeText={v=>setConditions(v.split(',').map(x=>x.trim()).filter(Boolean))} placeholder="e.g. asthma, diabetes"/><Field label="Allergies" value={allergies.join(', ')} onChangeText={v=>setAllergies(v.split(',').map(x=>x.trim()).filter(Boolean))} placeholder="e.g. penicillin"/><Field label="Current medications" value={medications.join(', ')} onChangeText={v=>setMedications(v.split(',').map(x=>x.trim()).filter(Boolean))} placeholder="Separate with commas"/><Field label="Guardian phone" value={guardian} onChangeText={setGuardian} placeholder="Emergency contact"/><Button title="Save medical profile" onPress={save}/></View><Button title="Log out" onPress={onLogout} variant="secondary"/></ScrollView>;
}

function App() {
  const [user,setUser]=useState(null); const [screen,setScreen]=useState('splash'); const [ready,setReady]=useState(false);
  useEffect(()=>{setUser(getStoredUser());setReady(true);},[]);
  const updateUser = u => { setUser(u); saveUser(u); };
  const tabs = useMemo(()=>user?['Emergency','AI Triage','Profile']:[],[user]);
  if(!ready) return <View style={styles.loader}><ActivityIndicator size="large" color={COLORS.primary}/></View>;
  let content;
  if(!user && screen==='splash') content=<Splash onLogin={()=>setScreen('login')} onSignup={()=>setScreen('signup')}/>;
  else if(!user && screen==='login') content=<Login onBack={()=>setScreen('splash')} onSuccess={u=>{updateUser(u);setScreen('Emergency')}}/>;
  else if(!user) content=<Signup onBack={()=>setScreen('splash')} onSuccess={u=>{updateUser(u);setScreen('Emergency')}}/>;
  else if(screen==='Emergency') content=<Emergency/>;
  else if(screen==='AI Triage') content=<Chat/>;
  else content=<Profile user={user} onUpdate={updateUser} onLogout={()=>{if(Platform.OS==='web'&&typeof window!=='undefined')window.localStorage.removeItem(STORAGE_KEY);setUser(null);setScreen('splash')}}/>;
  return <SafeAreaView style={styles.app}><StatusBar barStyle="dark-content"/>{content}{user&&<View style={styles.tabs}>{tabs.map(t=><Pressable key={t} onPress={()=>setScreen(t)} style={[styles.tab,screen===t&&styles.activeTab]}><Text style={[styles.tabText,screen===t&&styles.activeTabText]}>{t==='Emergency'?'🚨':t==='AI Triage'?'🤖':'👤'}  {t}</Text></Pressable>)}</View>}</SafeAreaView>;
}

const styles=StyleSheet.create({app:{flex:1,backgroundColor:COLORS.background},loader:{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.background},centerPage:{width:'100%',maxWidth:560,alignSelf:'center',padding:32,justifyContent:'center',flexGrow:1},formPage:{width:'100%',maxWidth:560,alignSelf:'center',padding:32,paddingBottom:60},page:{width:'100%',maxWidth:900,alignSelf:'center',padding:28,paddingBottom:100},chatPage:{width:'100%',maxWidth:900,alignSelf:'center',padding:28,flex:1,paddingBottom:95},logo:{width:72,height:72,borderRadius:22,backgroundColor:COLORS.primary,alignItems:'center',justifyContent:'center',marginBottom:24},logoText:{fontSize:38,fontWeight:'900',color:'#fff'},kicker:{fontSize:11,fontWeight:'800',letterSpacing:1.5,color:COLORS.primary,marginBottom:8},heroTitle:{fontSize:44,fontWeight:'900',color:COLORS.text,marginBottom:12},heroSub:{fontSize:17,lineHeight:26,color:COLORS.muted,marginBottom:24},pageTitle:{fontSize:38,fontWeight:'900',color:COLORS.text,marginBottom:8},sectionTitle:{fontSize:25,fontWeight:'800',color:COLORS.text,marginTop:8,marginBottom:12},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:22},status:{flexDirection:'row',alignItems:'center',gap:7},dot:{width:8,height:8,borderRadius:8,backgroundColor:COLORS.success},statusText:{fontSize:10,fontWeight:'800',color:COLORS.success},card:{backgroundColor:COLORS.surface,borderWidth:1,borderColor:COLORS.border,borderRadius:20,padding:20,marginBottom:18},cardTitle:{fontSize:17,fontWeight:'800',color:COLORS.text,marginBottom:7},muted:{color:COLORS.muted,fontSize:14,lineHeight:21},button:{height:52,borderRadius:14,backgroundColor:COLORS.primary,alignItems:'center',justifyContent:'center',marginTop:12},secondaryButton:{backgroundColor:COLORS.surface,borderWidth:1,borderColor:COLORS.border},dangerButton:{backgroundColor:COLORS.danger},disabledButton:{opacity:.5},pressed:{opacity:.75},buttonText:{color:'#fff',fontWeight:'800',fontSize:15},darkButtonText:{color:COLORS.text},fieldWrap:{marginTop:18},label:{fontSize:12,fontWeight:'800',color:COLORS.text,marginBottom:7},input:{height:48,borderWidth:1,borderColor:COLORS.border,borderRadius:12,paddingHorizontal:14,color:COLORS.text,backgroundColor:COLORS.surface},error:{color:COLORS.danger,fontSize:13,marginTop:14,lineHeight:19},sosCard:{backgroundColor:'#FFF1F2',borderWidth:1,borderColor:'#FECDD3',borderRadius:22,padding:24,marginBottom:28},sosEyebrow:{fontSize:11,fontWeight:'900',letterSpacing:1,color:COLORS.danger},sosTitle:{fontSize:27,fontWeight:'900',color:'#7F1D1D',marginVertical:8},sosSub:{fontSize:14,lineHeight:21,color:'#991B1B',marginBottom:18},sosButton:{height:58,borderRadius:15,backgroundColor:COLORS.danger,alignItems:'center',justifyContent:'center'},sosButtonText:{color:'#fff',fontSize:17,fontWeight:'900'},quickGrid:{flexDirection:'row',gap:10,marginBottom:28},quickCard:{flex:1,backgroundColor:COLORS.surface,borderWidth:1,borderColor:COLORS.border,borderRadius:16,padding:18},quickNumber:{fontSize:22,fontWeight:'900',color:COLORS.primary,marginBottom:4},hospital:{flexDirection:'row',alignItems:'center',backgroundColor:COLORS.surface,borderWidth:1,borderColor:COLORS.border,borderRadius:14,padding:16,marginTop:9},hospitalName:{fontSize:15,fontWeight:'800',color:COLORS.text,marginBottom:3},callLink:{fontSize:11,fontWeight:'900',color:COLORS.primary},profileCard:{backgroundColor:COLORS.surface,borderWidth:1,borderColor:COLORS.border,borderRadius:20,padding:20,marginTop:22,marginBottom:14},tabs:{position:'absolute',bottom:0,left:0,right:0,minHeight:68,backgroundColor:COLORS.surface,borderTopWidth:1,borderTopColor:COLORS.border,flexDirection:'row',paddingHorizontal:10,paddingTop:8,paddingBottom:8},tab:{flex:1,alignItems:'center',justifyContent:'center',borderRadius:12},activeTab:{backgroundColor:'#F0E9F8'},tabText:{fontSize:12,color:COLORS.muted,fontWeight:'700'},activeTabText:{color:COLORS.primary},messages:{flex:1,marginTop:18,marginBottom:12},message:{maxWidth:'82%',padding:14,borderRadius:16,marginBottom:10},aiMessage:{alignSelf:'flex-start',backgroundColor:COLORS.surface,borderWidth:1,borderColor:COLORS.border},userMessage:{alignSelf:'flex-end',backgroundColor:'#EDE9FE'},messageText:{fontSize:14,lineHeight:21,color:COLORS.text},chatBar:{flexDirection:'row',alignItems:'flex-end',gap:8},chatInput:{flex:1,minHeight:48,maxHeight:110,borderWidth:1,borderColor:COLORS.border,borderRadius:14,padding:12,backgroundColor:COLORS.surface,color:COLORS.text},send:{width:48,height:48,borderRadius:14,backgroundColor:COLORS.primary,alignItems:'center',justifyContent:'center'},sendText:{fontSize:25,fontWeight:'700',color:'#fff'}});

export default App;
