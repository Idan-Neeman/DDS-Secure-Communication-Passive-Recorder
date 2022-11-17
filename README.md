
# DDS Secure Communication Passive Recorder

DDS Secure Communication Passive Recorder is a tool for recording and analyzing all DDS traffic on your network interface. The tool listens to the network, does not contain participants or entities in DDS, thus ensuring that its use does not change behavior in the existing system.

## Secure Communication

The Security Model for DDS defines the security principals and among them is the possibility to encrypt the data in order to maintain the confidentiality of the data samples transmitted over the network.
Due to this, listening to the network and viewing packets will not help the listener because the information is encrypted and he has no possibility to understand the content of the information.

## Passive Recording

The naive option of recording DDS traffic by creating participants in the domain and creating readers is available and easy, but in some cases we will want to perform a recording without being active in the RTPS protocol.

The recording & analyzing becomes more difficult when we want to record DDS traffic when security enabled.
In this situation, we will not be able to understand the discovery process from the packets we listen to and thus not understand who the participants in the communication, nor the data samples transmitted.

In order to overcome the challenge, we need to know the private keys of each DomainParticipant (It may be either a 2048-bit RSA private
key or a 256-bit Elliptic Curve Key for use with the prime256v1 curve).
Using the private key we can decrypt the packets and recover the samples.

In order to understand the discovery process, we will cross all the private keys we have until we get an understandable decryption, in order to build dictionary of (participant:source_guid).
## References

[DDS Security Specification Version 1.1](https://www.omg.org/spec/DDS-SECURITY/1.1/PDF)

