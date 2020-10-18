import React from "react";
import { StyleSheet, Dimensions, View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
import ReadMore from "./../../Elements/Button/ReadMore";
const { width, height } = Dimensions.get("window");

import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";

const About = () => {
  return (
    <View style={viewUtil.viewPageWrapper}>
      <View style={styles.aboutCard}>
        <ScrollView>
          <View style={styles.teaserLabel}>
            <TextLabel>"NEW TOWN" developed as an urban settlement is the outcome of the foresight of the then government of West Bengal. The effort to build such a township is a planned manner must be regarded as praiseworthy initiative words elevating the problems of housing increasingly faced by the people of West Bengal. The government of West Bengal surely  deserves credit in its efforts to build such a township as it succeeded in acquiring vast tracts of land of Rajarhat police station and paying appropriate compensation for the purpose to those who owned the lands acquired and also rehabilitating them properly . The government further  undertook necessary measures to develop infrastructure and urban facilities commensurate with a modern developing township such as "NEWTOWN" of which we are residents at present.</TextLabel>
          </View>
          <View style={styles.teaserLabel}>
            <TextLabel>As residents of the town we have  been enjoying some facilities and civic amenities but at the same time we as residents of  a " Smart City" are yet   to be entitled to some other amenities that usually associated with a "Smart City" . The entire area of the " New Town"  has been divided for administrative purposes into several blocks and within some of the blocks , however,  a few large housing complexes have come up over the years .But it has been observed that the cultural and social relationship amongst the residents of the housing complexes and those residing in the blocks the problems being experienced by the residents of the complexes and the blocks are varied but in some respects are essentially similar.  Meanwhile some residents have come to the realisation during numerous interactions among themselves on various occasions that it would be more effective and fruitful if  some coordination is developed among the different block associations and Housing complexes to sortout and place demands with appropriate authorities for purpose redressal.</TextLabel>
          </View>
          <View style={styles.teaserLabel}>
            <TextLabel>With this purpose in view some residents (11 numbers) of different blocks of Newtown drafted and signed an appeal addressed to the residents of all housing complexes, block associations on the basis of some basic demands agreed upon mutual discussions.  On the basis of the said appeal a convention of residents was held on 18th August 2019  at the Rabindra Tirtha Auditorium , New Town . About 200 residents of Newtown assembled at the convention and formed an association , named " NEW TOWN RESIDENTS' WELFARE FORUM "  (NTRWF ) . The working committee was formed with at least one member each from every block / housing complexes.</TextLabel>
          </View>
          <View style={styles.teaserLabel}>
            <TextLabel style={[{ fontWeight: "bold" }]}>The registered office of the forum situated at :-DA 22 , Street no - 247, New Town , Kolkata - 700156. </TextLabel>
          </View>

          <View style={styles.teaserLabel}>
            <TextLabel style={[{ fontWeight: "bold" }]}>The Objectives : </TextLabel>
          </View>
          <View style={styles.teaserLabel}>
            <TextLabel>   To maintain  and promote peace and harmony among all sections of pe lolople living in Newtown keeping in mind the ideals of unity in diversity of India.</TextLabel>
          </View>
          <View style={styles.teaserLabel}>
            <TextLabel>   To promote public Health awareness among people.</TextLabel>
          </View>
          <View style={styles.teaserLabel}>
            <TextLabel>  To foster the spirit of international brotherhood and intellectual cooperation amongst the citizens of New town.</TextLabel>
          </View>
          <View style={styles.teaserLabel}>
            <TextLabel>  To fight against any attack on the democratic rights and securities of the people of New Town and to fight against all shots of exploitation.</TextLabel>
          </View>
          <View style={styles.teaserLabel}>
            <TextLabel>  To promote and engage in  all sorts of activities for ensuring  wellbeing of residents of Newtown in general. </TextLabel>
          </View>

          <View style={styles.teaserLabel}>
            <TextLabel>  To develop  scientific social awareness among the residents of New Town by organising different activities from time to time. </TextLabel>
          </View>

          <View style={styles.teaserLabel}>
            <TextLabel>  To undertake projects and activities for the overall socio - economic development of New Town and implement various schemes there of. </TextLabel>
          </View>

          <View style={styles.teaserLabel}>
            <TextLabel>  To interact with social workers of different social welfare organisations to carry out different kinds of social work and to help and provide service and care to those who are sick,  aged and ailing poor and downtrodden public at large and also so the victims  of the the unforeseen local or national calamities and disasters. </TextLabel>
          </View>

          <View style={styles.teaserLabel}>
            <TextLabel>  To promote and encourage advancement of literary,  cultural and scientific attitude and education. </TextLabel>
          </View>

          <View style={styles.teaserLabel}>
            <TextLabel>  To arrange and organise lectures, debates, discussions, seminar and excursions for the diffusion of knowledge and ideas. </TextLabel>
          </View>

          <View style={styles.teaserLabel}>
            <TextLabel>  To publish or promote the publication of journals, books, magazines, papers etc  to propagate the aims and objectives of the organisation without any intention of making profit. </TextLabel>
          </View>

          <View style={styles.teaserLabel}>
            <TextLabel>  To organise all other activities which are incidental , encelliary and complementary to achievement of foregoing objectives. </TextLabel>
          </View>

          <View style={styles.teaserLabel}>
            <TextLabel style={[{ fontWeight: "bold" }]}>About The Developer : </TextLabel>
          </View>
          <View style={styles.teaserLabel}>
            <TextLabel>The developer of this app can be reached at joydas1611@gmail.com,as well as at 8884855687 over telephone. </TextLabel>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  aboutCard: {
    borderRadius: 6,
    backgroundColor: "#ffffff",
    padding: 15,
    margin: 15,
  },
});
export default About;
