// styles/profil.style.js
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: 0
  },
  backButton: {
    padding: 8,
  },
  editText:{
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "500",
    padding: 8,
  },
  adminText:{
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "500",
    padding: 0,
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 30,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 5,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    color: COLORS.primary,
  },
  name: {
    fontSize: 18,
    fontWeight: "400",
    color: COLORS.text,
    marginBottom: 5,
  },
  profession: {
    fontSize: 16,
    color: COLORS.income,
  },
  section: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.income,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.income,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.income,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
    marginLeft: 15,
  },
  languageSelection: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageText: {
    fontSize: 14,
    color: COLORS.income,
    marginRight: 5,
  },
  logoutButton: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    
  },
  logoutText: {
    color: COLORS.expense,
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  
  modalContent: {
    zIndex: 2,
    width: '90%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  fullImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  
  closeButton: {
    position: 'absolute',
    top: -40, // Au-dessus de l'image
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  },
});